"use server";

import fakeDelay from "@/lib/delay";
import { list } from "@vercel/blob";
import { Filename, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getFiles = async () => {
  try {
    await fakeDelay(2000);
    const { blobs } = await list();

    const fileAliases: Filename[] = await prisma.filename.findMany();

    fileAliases.forEach((fileAlias: Filename) => {
      const blob = blobs.find((blob) => blob.url.split(".com/")[1] === fileAlias.file);
      if (blob) {
        (blob as any).alias = fileAlias.alias;
      }
    });

    return {
      message: "Files fetched successfully",
      data: blobs,
    };
  } catch (error) {
    return {
      message: "Failed to get files",
      error: "An error occurred while fetching files",
    };
  }
};

export default getFiles;
