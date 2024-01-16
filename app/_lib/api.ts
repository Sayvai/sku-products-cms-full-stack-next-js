import { SafeParseError, SafeParseReturnType, SafeParseSuccess } from "zod";
import { SkuItemApiResponse } from "../_types/sku";
import { headers } from "next/headers";

export function getApiRouteError(error: unknown, status = 500): Response {
  return new Response(
    `Internal Server Error: ${(error as Error).message || error}`,
    {
      status,
    }
  );
}

export async function getSkuProducts(): Promise<SkuItemApiResponse[]> {
  try {
    const host = getHost();
    const response = await fetch(`${host}/api/sku`);
    const data: SkuItemApiResponse[] = await response.json();

    return data;
  } catch (error) {
    console.error(
      `There was a problem fetching SKU products. Error message: ${error}`
    );
    return [];
  }
}

export function getHost() {
  const host = headers().get("host");
  const protocal = process?.env.NODE_ENV === "development" ? "http" : "https";

  return `${protocal}://${host}`;
}
