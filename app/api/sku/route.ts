import { getApiRouteError } from "@/app/_lib/api";
import { getDatabase } from "@/app/_lib/db";
import {
  SkuItemApiResponse,
  skuItemApiRequestValidator,
} from "@/app/_types/sku";

export async function GET(req: Request) {
  try {
    const db = getDatabase();

    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") || 10;
    const offset = searchParams.get("offset") || 0;

    const rows: SkuItemApiResponse[] = await new Promise((resolve, reject) => {
      const _rows: SkuItemApiResponse[] = [];

      db.serialize(() => {
        db.all(
          "SELECT * FROM products LIMIT ? OFFSET ?",
          [limit, offset],
          (err, rows: SkuItemApiResponse[]) => {
            if (err) {
              reject(new Error("Error fetching SKU data from database"));
            }

            if (!rows || rows.length < 1) {
              reject(new Error("No SKU data found"));
            }

            _rows.push(...rows);

            resolve(_rows);
          }
        );
      });
    });

    return Response.json(rows);
  } catch (error) {
    return getApiRouteError(error);
  }
}

export async function POST(req: Request) {
  try {
    const validatedData = skuItemApiRequestValidator.safeParse(
      await req.json()
    );

    if (!validatedData.success) {
      const { errors } = validatedData.error;

      throw new Error(
        `Invalid data sent to API. Errors: ${JSON.stringify(errors)}`
      );
    }

    const { quantity, sku, description, store } = validatedData.data;

    const db = getDatabase();

    const status: number = await new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(
          "INSERT INTO products (quantity, sku, description, store) VALUES (?, ?, ?, ?)",
          [quantity, sku, description, store],
          (err) => {
            if (err) {
              console.error(err);
              reject(
                new Error(`Error adding SKU to database: ${err.message} `)
              );
            }

            resolve(201);
          }
        );
      });
    });

    const response: SkuItemApiResponse = { quantity, sku, description, store };

    return Response.json(response, { status });
  } catch (error) {
    return getApiRouteError(error);
  }
}

export async function PUT(req: Request, res: Response) {
  try {
    const validatedData = skuItemApiRequestValidator.safeParse(
      await req.json()
    );

    if (!validatedData.success) {
      const { errors } = validatedData.error;

      throw new Error(
        `Invalid data sent to API. Errors: ${JSON.stringify(errors)}`
      );
    }

    const { quantity, sku, description, store } = validatedData.data;

    const db = getDatabase();

    const status: number = await new Promise((resolve, reject) => {
      db.serialize(() => {
        db.get("SELECT * FROM products WHERE sku = ?", [sku], (err, row) => {
          if (err) {
            console.error(err);
            reject(
              new Error(
                `Error checking SKU: ${sku} in database. Error message: ${err.message}`
              )
            );
          }

          if (!row) {
            reject(new Error(`SKU: ${sku} not found in database`));
          }

          db.run(
            "UPDATE products SET quantity = ?, description = ?, store = ? WHERE sku = ?",
            [quantity, description, store, sku],
            (err) => {
              if (err) {
                console.error(err);
                reject(
                  new Error(
                    `Error updating SKU in database for SKU ${sku}: ${err.message}`
                  )
                );
              }

              resolve(200);
            }
          );
        });
      });
    });

    const response: SkuItemApiResponse = { quantity, sku, description, store };

    return Response.json(response, { status });
  } catch (error) {
    return getApiRouteError(error);
  }
}
