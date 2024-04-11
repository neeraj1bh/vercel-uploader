"use client";

import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

type GetFilesProps = {
  blobs: any;
};

const GetFiles = ({ blobs }: GetFilesProps) => {
  const handleSubmit = async () => {
    console.log("clicked");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center flex-grow">
        <p className="text-center text-4xl font-bold text-gray-800 mt-6 uppercase">File Manager</p>
        {blobs.length && (
          <div className="flex items-center justify-center grow">
            <div className="flex flex-col gap-4 border rounded-lg h-[500px] overflow-scroll p-7">
              {blobs.map((blob: any) => (
                <div key={blob.url + Math.random()} className="flex space-x-10">
                  <p className="h-6 w-[200px] text-base text-ellipsis overflow-hidden font-medium tracking-wide">
                    {blob.alias || blob.pathname}
                  </p>
                  <a href={blob.downloadUrl} target="_blank">
                    Download
                  </a>
                  <Pencil onClick={handleSubmit} height={15} width={15} />
                  <Trash2 onClick={handleSubmit} height={15} width={15} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
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
