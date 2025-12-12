"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-[95vw] sm:max-w-sm",
    md: "max-w-[95vw] sm:max-w-md",
    lg: "max-w-[95vw] sm:max-w-lg",
    xl: "max-w-[95vw] sm:max-w-xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative bg-white rounded-xl shadow-2xl w-full mx-2 sm:mx-4 max-h-[85vh] overflow-y-auto",
          sizes[size]
        )}
      >
        {title && (
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-secondary-900">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-secondary-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-secondary-500" />
            </button>
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
