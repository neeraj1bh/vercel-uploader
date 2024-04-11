"use server";

import fakeDelay from "@/lib/delay";
import { list } from "@vercel/blob";

const getFiles = async () => {
  await fakeDelay(2000);

  const blobs = await list();

  return blobs;
};

export default getFiles;
