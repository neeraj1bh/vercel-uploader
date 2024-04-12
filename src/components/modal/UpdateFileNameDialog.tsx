"use client";

import React, { FC } from "react";
import { BaseDialog } from ".";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  onNameChange: (name: string) => void;
  onEdit: () => void;
  loading?: boolean;
};

const UpdateFileNameDialog: FC<Props> = ({
  isOpen,
  onClose,
  name,
  onNameChange,
  onEdit,
  loading,
}) => {
  return (
    <BaseDialog
      isOpen={isOpen}
      onClose={onClose}
      dialogTitle="Rename File"
      dialogDescription="Enter the new filename"
      submitOptions={{ onSubmit: onEdit, label: "Save changes" }}
      disabled={!name}
      loading={loading}
    >
      <div className="py-5">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          defaultValue="Enter new filename"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </div>
    </BaseDialog>
  );
};

export default UpdateFileNameDialog;
