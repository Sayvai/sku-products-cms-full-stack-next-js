import { getApiRouteError } from "@/app/_lib/api";
import { getDatabase } from "@/app/_lib/db";
import { skuIdValidator } from "@/app/_types/sku";

interface Params {
  params: {
    id: string;
  };
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const validatedData = skuIdValidator.safeParse(params.id);

    if (!validatedData.success) {
      const { errors } = validatedData.error;

      throw new Error(
        `Invalid SKU ID format sent to API. Errors: ${JSON.stringify(errors)}`
      );
    }

    const skuId = validatedData.data;

    if (!skuId) {
      return new Response("No SKU provided", { status: 400 });
    }

    const db = getDatabase();

    const status: number = await new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run("DELETE FROM products WHERE sku = ?", [skuId], (err) => {
          if (err) {
            console.error(err);
            reject(new Error(`Error deleting SKU ${skuId} from database`));
          }

          resolve(200);
        });
      });
    });

    return new Response(`Product deleted successfully for SKU ID: ${skuId}`, {
      status,
    });
  } catch (error) {
    return getApiRouteError(error);
  }
}
