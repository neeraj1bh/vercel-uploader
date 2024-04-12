"use client";

import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import SpinnerIcon from "@/assets/SpinnerIcon";

type Props = {
  dialogTitle: string;
  dialogDescription?: string;
  submitOptions?: {
    label?: string;
    onSubmit: () => void;
  };
  disabled?: boolean;
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  loading?: boolean;
};

export const BaseDialog: FC<Props> = ({
  isOpen,
  onClose,
  dialogTitle,
  dialogDescription,
  disabled,
  submitOptions,
  loading,
  children,
}) => {
  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent className="max-w-80 rounded-xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter className="gap-4 sm:justify-start">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
          {submitOptions &&
            (loading ? (
              <Button type="submit" disabled>
                <SpinnerIcon className="mr-4 animate-spin" />
                Just a moment...
              </Button>
            ) : (
              <Button type="submit" onClick={submitOptions.onSubmit} disabled={disabled}>
                {submitOptions?.label || "Submit"}
              </Button>
            ))}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
