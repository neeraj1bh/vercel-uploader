"use client";

import React, { FC, useEffect, useState } from "react";
import { Download, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import UpdateFileNameDialog from "./modal/UpdateFileNameDialog";
import DeleteConfirmationDialog from "./modal/DeleteConfirmationDialog";
import { useDialog } from "../hooks/useDialog";
import FileLink from "./FileLink";

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

type Props = {
  blobs?: Blob[];
  handleDelete: (urlToDelete: string) => Promise<Response>;
  handleEdit: (newName: string, oldName: string) => Promise<Response>;
  message: string;
  error?: string;
};

enum DialogAction {
  Rename = "rename",
  Delete = "delete",
}

const GetFiles: FC<Props> = ({
  blobs: initialBlobs,
  handleDelete,
  handleEdit,
  message: initialMessage,
  error: initialError,
}) => {
  const { isOpen, onOpen, onClose } = useDialog();
  const {
    isOpen: isDeleteDialogOpen,
    onOpen: openDeleteDialog,
    onClose: closeDeleteDialog,
  } = useDialog();
  const [action, setAction] = useState("");
  const [name, setName] = useState("");
  const [urlPath, setUrlPath] = useState("");
  const [blobs, setBlobs] = useState(initialBlobs);
  const { toast } = useToast();
  const [message, setMessage] = useState<string | undefined>(initialMessage);
  const [error, setError] = useState<string | undefined>(initialError);
  const [loading, setLoading] = useState(false);

  const handleActionModal = (actionType: string, url: string) => {
    if (actionType === DialogAction.Rename) {
      onOpen();
    } else {
      openDeleteDialog();
    }
    setAction(actionType);
    setUrlPath(url);
    setName("");
  };

  const handleSubmit = async () => {
    let response;
    try {
      if (action === DialogAction.Rename) {
        setLoading(true);
        response = await handleEdit(name, urlPath);
        const updatedBlobs = blobs?.map((blob) => {
          if (blob.url === urlPath) {
            return { ...blob, alias: name };
          }
          return blob;
        });
        setLoading(false);
        setBlobs(updatedBlobs);
        setName("");
        onClose();
      } else {
        setLoading(true);
        response = await handleDelete(urlPath);
        const updatedBlobs = blobs?.filter((blob) => blob.url !== urlPath);
        setLoading(false);
        setBlobs(updatedBlobs);
        closeDeleteDialog();
      }
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
    <>
      <div className="flex flex-col min-h-screen max-w-screen">
        <div className="flex flex-col items-center grow">
          <p className="text-center text-4xl font-bold text-gray-800 mt-6 mb-10 uppercase">
            File Manager
          </p>
          {blobs?.length ? (
            <div className="flex items-center grow">
              <div className="flex flex-col gap-4 py-7  border rounded-lg h-[500px] overflow-y-scroll w-[350px] md:w-full">
                {blobs.map((blob) => (
                  <div
                    key={blob.url}
                    className="flex justify-center items-center space-x-4 md:space-x-7"
                  >
                    <p className="h-6 max-w-[50%] min-w-[50%] overflow-hidden  text-base text-ellipsis  font-medium tracking-wide">
                      {blob.alias || blob.pathname}
                    </p>
                    <div className="flex gap-4">
                      <a href={blob.downloadUrl}>
                        <Download height={15} width={15} className="text-blue-500 cursor-pointer" />
                      </a>
                      <Pencil
                        onClick={() => handleActionModal(DialogAction.Rename, blob.url)}
                        height={15}
                        width={15}
                        className="cursor-pointer"
                      />
                      <Trash2
                        onClick={() => handleActionModal(DialogAction.Delete, blob.url)}
                        height={15}
                        width={15}
                        className="text-red-500 cursor-pointer"
                      />
                    </div>
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
        <FileLink href="/" />
      </div>
      <UpdateFileNameDialog
        isOpen={isOpen}
        onClose={onClose}
        name={name}
        onNameChange={setName}
        onEdit={handleSubmit}
        loading={loading}
      />
      <DeleteConfirmationDialog
        dialogDescription="Are you sure you want to delete this file? This action cannot be undone."
        dialogTitle="Delete File"
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={handleSubmit}
        loading={loading}
      />
    </>
  );
};

export default GetFiles;
