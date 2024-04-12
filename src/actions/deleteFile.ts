"use server";

import extractFileNameFromUrl from "@/lib/extractFileNameFromUrl";
import { PrismaClient } from "../../prisma/generated/client";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

const updateFileStatus = async (url: string, deleted: boolean) => {
  const file = extractFileNameFromUrl(url);

  const existingFile = await prisma.filename.findUnique({
    where: { file },
  });

  if (existingFile) {
    await prisma.filename.update({
      where: { file },
      data: { deleted },
    });
  }
};

const deleteFile = async (urlToDelete: string) => {
  try {
    await updateFileStatus(urlToDelete, true);

    await del(urlToDelete);

    revalidatePath("/files");
    return { message: "File deleted successfully" };
  } catch (error) {
    await updateFileStatus(urlToDelete, false);

    return {
      message: "File deletion failed",
      error: "An error occurred while deleting the file",
    };
  }
};

export default deleteFile;
