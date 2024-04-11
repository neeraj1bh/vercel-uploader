import React from "react";
import type { Metadata } from "next";
import getFiles from "@/actions/getFiles";
import GetFiles from "@/components/GetFiles";

const Files = async () => {
  const { blobs } = await getFiles();

  return <GetFiles blobs={blobs} />;
};

export default Files;

export const metadata: Metadata = {
  title: "File Manager",
  description: "View uploaded files",
};
