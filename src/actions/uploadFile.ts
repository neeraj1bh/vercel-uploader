"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

type DataProps = {
  url: string;
  downloadUrl: string;
  pathname: string;
  contentType?: string;
  contentDisposition: string;
};

type FormActionProps = {
  file?: FileList;
  message: string;
  error?: string;
  data?: DataProps;
};

const uploadFormAction = async (
  prevState: FormActionProps,
  formData: FormData,
): Promise<FormActionProps> => {
  try {
    const data = Object.fromEntries(formData);
    const { file } = data;
    const { name } = file as File;

    if (!file) {
      throw new Error("File is missing");
    }

    await callAPI("Upload begins");

    const blob = await put(name, file, {
      access: "public",
    });

    await callAPI("Upload success");

    revalidatePath("/files");

    return { message: "File uploaded successfully", data: blob };
  } catch (error) {
    console.log(error);
    await callAPI("Upload failed");

    return {
      message: "Something went wrong",
      error: "Upload failed",
    };
  }
};

export default uploadFormAction;

// Function to call API
async function callAPI(status: string) {
  const response = await fetch("https://www.google.com/", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("API request failed");
  }
  console.log(status);
}
