import UploadForm from "@/components/UploadForm";
import type { Metadata } from "next";

export default function Home() {
  return <UploadForm />;
}

export const metadata: Metadata = {
  title: "Upload Files",
  description: "Upload files to your Vercel account.",
};
