import { createReadStream } from "fs";
import csvParser from "csv-parser";
import { getDatabase } from "@/app/_lib/db";
import { createTemporaryFile, deleteFile } from "@/app/_lib/files";
import { getApiRouteError } from "@/app/_lib/api";
import { skuFileUploadApiRequestValidator } from "@/app/_types/sku";

export async function POST(req: Request) {
  try {
    const validatedData = skuFileUploadApiRequestValidator.safeParse(
      await req.formData()
    );

    if (!validatedData.success) {
      const { errors } = validatedData.error;

      return new Response(`Invalid data sent to API. ${errors.join(",")}`, {
        status: 400,
      });
    }

    const db = getDatabase();

    const skuFile = validatedData.data["sku-file"];

    if (!skuFile) {
      return new Response("No file uploaded (!skuFile)", { status: 400 });
    }

    const fullPath = await createTemporaryFile(skuFile);

    const stream = createReadStream(fullPath);

    const status = await new Promise<number>((resolve, reject) => {
      db.serialize(() => {
        // run a DB command to clear products table
        db.run("DELETE FROM products");

        stream.pipe(csvParser()).on("data", (data) => {
          const { quantity, sku, description, store } = data;

          db.run(
            "INSERT INTO products (quantity, sku, description, store) VALUES (?, ?, ?, ?)",
            [quantity, sku, description, store],
            (error) => {
              if (error) {
                reject(
                  `Error inserting data into database. Databae error: ${error}`
                );
              }
            }
          );
        });
      });

      stream.on("end", async () => {
        await deleteFile(fullPath);

        resolve(201);
      });

      stream.on("error", (error) => {
        reject("Error processing file");
      });
    });

    return new Response("File uploaded and processed successfully", {
      status,
    });
  } catch (error) {
    return getApiRouteError(error);
  }
}
