"use client";

import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Modal, useDialog } from "@/components/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

type Blob = {
  alias?: string;
  pathname: string;
  url: string;
  downloadUrl: string;
  size: number;
  uploadedAt: Date;
};

type Response = {
  message: string;
  error?: string;
};
type GetFilesProps = {
  blobs?: Blob[];
  handleDelete: (urlToDelete: string) => Promise<Response>;
  handleEdit: (newName: string, oldName: string) => Promise<Response>;
  message: string;
  error?: string;
};

const GetFiles = ({
  blobs: initialBlobs,
  handleDelete,
  handleEdit,
  message: initialMessage,
  error: initialError,
}: GetFilesProps) => {
  const { isOpen, onOpen, onClose } = useDialog();
  const [action, setAction] = useState("");
  const [name, setName] = useState("");
  const [urlPath, setUrlPath] = useState("");
  const [blobs, setBlobs] = useState(initialBlobs);
  const { toast } = useToast();
  const [message, setMessage] = useState<string | undefined>(initialMessage);
  const [error, setError] = useState<string | undefined>(initialError);

  const handleActionModal = (actionType: string, url: string) => {
    onOpen();
    setAction(actionType);
    setUrlPath(url);
    setName("");
  };

  console.log(blobs, initialBlobs);

  const handleSubmit = async () => {
    let response;
    try {
      if (action === "rename") {
        response = await handleEdit(name, urlPath);
        const updatedBlobs = blobs?.map((blob) => {
          if (blob.url === urlPath) {
            return { ...blob, alias: name };
          }
          return blob;
        });
        setBlobs(updatedBlobs);
        setName("");
      } else if (action === "delete") {
        response = await handleDelete(urlPath);
        const updatedBlobs = blobs?.filter((blob) => blob.url !== urlPath);
        setBlobs(updatedBlobs);
      }
      onClose();
      setMessage(response?.message);
      setError("");
    } catch (error) {
      setMessage("");
      setError(response?.error);
    }
  };

  useEffect(() => {
    const description = error || message;

    if (description) {
      const variant = error ? "destructive" : "default";
      const title = error ? "Error" : "Success";

      toast({
        variant,
        title,
        description,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, error]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center flex-grow">
        <p className="text-center text-4xl font-bold text-gray-800 mt-6 uppercase">File Manager</p>
        {blobs?.length ? (
          <div className="flex items-center justify-center grow">
            <div className="flex flex-col gap-4 border rounded-lg h-[500px] overflow-scroll p-7">
              {blobs.map((blob) => (
                <div key={blob.url + Math.random()} className="flex space-x-10">
                  <p className="h-6 w-[200px] text-base text-ellipsis overflow-hidden font-medium tracking-wide">
                    {blob.alias || blob.pathname}
                  </p>
                  <a href={blob.downloadUrl} target="_blank">
                    Download
                  </a>
                  <Pencil
                    onClick={() => handleActionModal("rename", blob.url)}
                    height={15}
                    width={15}
                  />
                  <Trash2
                    onClick={() => handleActionModal("delete", blob.url)}
                    height={15}
                    width={15}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex grow justify-center items-center h-full">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md">
              <h2 className="text-4xl font-base   text-gray-800 mb-4">No Files Uploaded</h2>
              <p className="text-lg text-gray-600 my-6">
                It seems there are no files uploaded yet.
                <p className="text-sm text-gray-500">Upload some files to get started.</p>
              </p>
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        dialogTitle={action === "rename" ? "Rename File" : "Delete File"}
        dialogDescription={
          action === "rename"
            ? "Enter the new filename"
            : "Are you sure you want to delete this file?"
        }
        onSubmit={handleSubmit}
        action={action}
        disabled={action === "rename" && !name}
      >
        {action === "rename" && (
          <div className="py-5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              defaultValue="Enter new filename"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
      </Modal>
      <Link
        href="/"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 text-center bottom-0 w-full"
      >
        Upload Files
      </Link>
    </div>
  );
};

export default GetFiles;
