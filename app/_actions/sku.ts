"use server";

import { revalidatePath } from "next/cache";
import { getHost } from "../_lib/api";
import { skuIdValidator } from "../_types/sku";

export async function deleteSkuItem(skuId: string) {
  const host = getHost();

  const validatedData = skuIdValidator.safeParse(skuId);

  try {
    if (!validatedData.success) {
      const { errors } = validatedData.error;
      throw new Error(`SKU ID format is invalid: ${JSON.stringify(errors)}`);
    }

    const response = await fetch(`${host}/api/sku/${skuId}`, {
      method: "DELETE",
    });

    revalidatePath("/sku-cms");
  } catch (error) {
    const message = `There was a problem deleting SKU item. Error message: ${
      (error as Error).message || error
    }`;
    console.error(message);
    alert(message);
  }
}
