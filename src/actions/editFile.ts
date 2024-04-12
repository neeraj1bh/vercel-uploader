"use server";

import fakeDelay from "@/lib/delay";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const editFile = async (newName: string, oldName: string) => {
  try {
    console.log(newName, oldName);
    const file = oldName.split(".com/")[1];

    await fakeDelay(1000);
    const existingFile = await prisma.filename.findUnique({
      where: {
        file,
      },
    });

    if (existingFile) {
      await prisma.filename.update({
        where: {
          id: existingFile.id,
        },
        data: {
          alias: newName,
        },
      });
    } else {
      await prisma.filename.create({
        data: {
          file,
          alias: newName,
        },
      });
    }

    return { message: "File renamed successfully" };
  } catch (error) {
    console.error("Error updating filename:", error);
    return {
      message: "File rename failed",
      error: "An error occurred while renaming the file",
    };
  }
};

export default editFile;
