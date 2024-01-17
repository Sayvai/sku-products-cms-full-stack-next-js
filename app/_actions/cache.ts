"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathOnClient(path: string) {
  revalidatePath(path);
}
