/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Spinner from "../helperComponets/Spinner";

interface IModalProps {
  title: string;
  description: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function Modal({
  title,
  description,
  children,
  isOpen,
  onClose,
  className,
}: IModalProps) {
  const [loading, setLoading] = useState(true);

  // Simulate loading for 500ms when modal opens
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300); // Adjust the delay if necessary
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleChange = useCallback(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      onClose();
    }, 300); // Adjust the delay if necessary
    return () => clearTimeout(timer);
  }, [setLoading, onClose]);
  return (
    <Dialog open={isOpen} onOpenChange={handleChange}>
      {loading ? (
        <Spinner />
      ) : (
        <DialogContent className={cn("sm:max-w-[425px]", className)}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      )}
    </Dialog>
  );
}
