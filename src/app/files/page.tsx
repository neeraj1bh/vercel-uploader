import React from "react";
import type { Metadata } from "next";
import getFiles from "@/actions/getFiles";
import ListFiles from "@/components/ListFiles";
import deleteFile from "@/actions/deleteFile";
import editFile from "@/actions/editFile";

const Files = async () => {
  const { data: blobs, message, error } = await getFiles();

  return (
    <ListFiles
      blobs={blobs}
      handleDelete={deleteFile}
      handleEdit={editFile}
      message={message}
      error={error}
    />
  );
};

export default Files;

export const metadata: Metadata = {
  title: "File Manager",
  description: "View uploaded files",
};

// Simulate SSR instead of SSG
export const dynamic = "force-dynamic";
