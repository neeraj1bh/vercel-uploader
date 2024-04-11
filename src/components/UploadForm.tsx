"use client";

import { schema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import uploadFormAction from "@/actions/uploadFile";
import Link from "next/link";

const UploadForm = () => {
  type FormSchema = z.infer<typeof schema>;
  const { pending } = useFormStatus();

  const [state, formAction] = useFormState(uploadFormAction, {
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const formRef = useRef<HTMLFormElement>(null);

  const fileRef = form.register("file");
  const fileSize = file?.size;

  const onSubmit = () => {
    if ((fileSize ?? 0) > 5 * 1024 * 1024) {
      form.resetField("file");
    } else {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }
      formAction(formData); // Pass the form data to formAction
      form.resetField("file");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  return (
    <div className="mx-auto max-w-xl flex flex-col space-y-10 justify-center items-center h-screen">
      <Form {...form}>
        <form
          //   action={formAction}
          ref={formRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center space-y-4"
        >
          <FormField
            control={form.control}
            name="file"
            render={(field) => {
              return (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <Input type="file" {...fileRef} onChange={handleFileChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {/* <input type="file" {...form.register("file")} /> */}
          <Button type="submit" disabled={pending}>
            Submit
          </Button>
        </form>
      </Form>
      <Link
        href="/files"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 text-center bottom-0 w-full absolute"
      >
        View Uploaded Files
      </Link>
    </div>
  );
};

export default UploadForm;

export const dynamic = "force-dynamic";
