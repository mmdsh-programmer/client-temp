"use server";

import { revalidatePath } from "next/cache";

export async function revalidateByPathAction(path: string) {
  revalidatePath(path);
}