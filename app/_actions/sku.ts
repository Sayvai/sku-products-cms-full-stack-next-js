"use server";

import { revalidatePath } from "next/cache";
import { getHost } from "../_lib/api";
import { SkuItemApiRequest, skuIdValidator } from "../_types/sku";

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

type ActionResponse =
  | {
      success: true;
      data: SkuItemApiRequest;
    }
  | {
      success: false;
      error: string;
    };

export async function updateSkuItem(
  item: SkuItemApiRequest
): Promise<ActionResponse> {
  const host = getHost();

  try {
    const response = await fetch(`${host}/api/sku`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    revalidatePath("/sku-cms");

    return {
      success: true,
      data: item,
    };
  } catch (error) {
    const message = `There was a problem updating SKU item ${
      item.sku
    }. Error message: ${(error as Error).message || error}`;
    console.error(message);

    return {
      success: false,
      error: message,
    };
  }
}

export async function createSkuItem(
  item: SkuItemApiRequest
): Promise<ActionResponse> {
  const host = getHost();

  try {
    const response = await fetch(`${host}/api/sku`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    revalidatePath("/sku-cms");

    return {
      success: true,
      data: item,
    };
  } catch (error) {
    const message = `There was a problem creating SKU item ${
      item.sku
    }. Error message: ${(error as Error).message || error}`;
    console.error(message);

    return {
      success: false,
      error: message,
    };
  }
}
