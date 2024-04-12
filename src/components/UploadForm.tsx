"use client";

import { schema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { useDialog } from "../hooks/useDialog";
import { BaseDialog } from "./modal";
import FileLink from "./FileLink";
import SpinnerIcon from "@/assets/SpinnerIcon";

const UploadForm = () => {
  type FormSchema = z.infer<typeof schema>;
  const { toast } = useToast();
  const { isOpen, onOpen, onClose } = useDialog();
  const [loading, setLoading] = useState(false);
  const [state, formAction] = useFormState(uploadFormAction, { message: "" });
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  const formRef = useRef<HTMLFormElement>(null);

  const fileRef = form.register("file");
  const fileSize = file?.size;

  useEffect(() => {
    const { error, message } = state;
    const description = error || message;

    if (description) {
      const variant = error ? "destructive" : "default";
      const title = error ? "Error" : "Success";
      setLoading(false);

      toast({
        variant,
        title,
        description,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.data, state?.message, state?.error]);

  const onSubmit = () => {
    setLoading(true);
    if ((fileSize ?? 0) > 5 * 1024 * 1024) {
      onOpen();
      form.resetField("file");
      setLoading(false);
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
          {loading ? (
            <Button className="flex items-center justify-center" disabled>
              <SpinnerIcon className="mr-4 animate-spin" />
              Uploading...
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </form>
      </Form>
      <FileLink href="/files" className="absolute" text="View Uploaded Files" />
      <BaseDialog isOpen={isOpen} onClose={onClose} dialogTitle="Error Uploading File">
        <div className="flex items-center space-x-2 min-h-10">
          <p>{"File size should be less than 5MB"}</p>
        </div>
      </BaseDialog>
    </div>
  );
};

export default UploadForm;

export const dynamic = "force-dynamic";
