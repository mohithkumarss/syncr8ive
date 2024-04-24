"use client";

import { CreateServerModal } from "@/components/models/create-server-modal";
import { use, useEffect, useState } from "react";
import { set } from "zod";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
    </>
  );
};
