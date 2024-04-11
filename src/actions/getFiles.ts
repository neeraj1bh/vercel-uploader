"use server";

import { list } from "@vercel/blob";

const getFiles = async () => {
  const blobs = await list();

  return blobs;
};

export default getFiles;
