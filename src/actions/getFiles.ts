"use server";

import fakeDelay from "@/lib/delay";
import { list } from "@vercel/blob";

const getFiles = async () => {
  try {
    await fakeDelay(2000);

    const { blobs } = await list();

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
