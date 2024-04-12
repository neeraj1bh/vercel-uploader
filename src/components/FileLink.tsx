"use client";

import React, { FC } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  className?: string;
};

const FileLink: FC<Props> = ({ href, className }) => {
  return (
    <Link
      href={href}
      className={cn(
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 text-center bottom-0 w-full",
        className,
      )}
    >
      View Uploaded Files
    </Link>
  );
};

export default FileLink;
