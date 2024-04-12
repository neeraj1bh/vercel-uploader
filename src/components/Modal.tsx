import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export interface ModalProps extends Props {
  dialogTitle: string;
  dialogDescription?: string;
  onSubmit?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}
export interface DialogProps extends Props {
  onOpen: () => void;
}

export const useDialog = (): DialogProps => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return {
    isOpen,
    onOpen,
    onClose,
  };
};

export function Modal({
  isOpen,
  onClose,
  dialogTitle,
  dialogDescription,
  onSubmit,
  disabled,
  children,
}: ModalProps) {
  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
          {onSubmit && (
            <Button type="submit" onClick={onSubmit} disabled={disabled}>
              Save changes
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
