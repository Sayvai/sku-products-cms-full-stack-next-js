import { createReadStream } from "fs";
import csvParser from "csv-parser";
import { getDatabase } from "@/app/_lib/db";
import { createTemporaryFile, deleteFile } from "@/app/_lib/files";
import { getApiRouteError } from "@/app/_lib/api";
import {
  SkuFileUploadApiRequest,
  skuFileUploadApiRequestValidator,
} from "@/app/_types/sku";

export async function POST(req: Request) {
  try {
    const validatedData = skuFileUploadApiRequestValidator.safeParse(
      await req.formData()
    );

    if (!validatedData.success) {
      const { errors } = validatedData.error;

      throw new Error(
        `Invalid data sent to API. Errors: ${JSON.stringify(errors)}`
      );
    }

    const db = getDatabase();

    const skuFile = validatedData.data["sku-file"];

    if (!skuFile) {
      return new Response("No file uploaded (!skuFile)", { status: 400 });
    }

    const fullPath = await createTemporaryFile(skuFile);

    const stream = createReadStream(fullPath);

    db.serialize(() => {
      stream.pipe(csvParser()).on("data", (data) => {
        const { quantity, sku, description, store } = data;
        db.run(
          "INSERT INTO products (quantity, sku, description, store) VALUES (?, ?, ?, ?)",
          [quantity, sku, description, store]
        );
      });
    });

    stream.on("end", async () => {
      await deleteFile(fullPath);
    });

    stream.on("error", (error) => {
      throw new Error("Error processing file");
    });

    return new Response("File uploaded and processed successfully", {
      status: 200,
    });
  } catch (error) {
    return getApiRouteError(error);
  }
}
