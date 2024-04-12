"use client";

import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const useDialog = (): Props => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  return {
    isOpen,
    onOpen,
    onClose,
  };
};
