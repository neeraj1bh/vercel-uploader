"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

type FormActionProps = {
  file?: FileList;
  message: string;
  error?: string;
  data?: any;
};

const uploadFormAction = async (
  prevState: FormActionProps,
  formData: FormData,
): Promise<FormActionProps> => {
  try {
    const data = Object.fromEntries(formData);
    const { file } = data;
    const { name, size, type } = file as File;
    console.log(name, size, type, file);

    if (!file) {
      throw new Error("File is missing");
    }

    await callAPI("Upload begins");

    const blob = await put(name, file, {
      access: "public",
    });

    console.log(blob);

    await callAPI("Upload success");

    revalidatePath("/files");

    return { message: "File uploaded successfully", data: blob };
  } catch (error) {
    console.log(error);
    await callAPI("Upload failed");

    return {
      message: "File size should be less than 5MB",
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
