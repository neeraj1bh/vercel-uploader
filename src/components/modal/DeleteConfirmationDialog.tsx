"use client";

import React, { FC } from "react";
import { BaseDialog } from ".";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;

  // this makes it possible to use the same component for different actions
  dialogTitle: string;
  dialogDescription: string;
  loading?: boolean;
};

const DeleteConfirmationDialog: FC<Props> = ({
  isOpen,
  onClose,
  onDelete,
  dialogTitle,
  dialogDescription,
  loading,
}) => {
  return (
    <BaseDialog
      isOpen={isOpen}
      onClose={onClose}
      dialogTitle={dialogTitle}
      dialogDescription={dialogDescription}
      submitOptions={{
        onSubmit: onDelete,
        label: "Delete",
      }}
      loading={loading}
    ></BaseDialog>
  );
};

export default DeleteConfirmationDialog;
