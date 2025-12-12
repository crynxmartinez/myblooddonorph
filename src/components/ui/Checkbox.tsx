"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { forwardRef } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const checkboxId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        <label
          htmlFor={checkboxId}
          className={cn("flex items-start gap-3 cursor-pointer", className)}
        >
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              className="peer sr-only"
              {...props}
            />
            <div
              className={cn(
                "w-5 h-5 border-2 rounded transition-all duration-200",
                "peer-checked:bg-primary-600 peer-checked:border-primary-600",
                error ? "border-red-500" : "border-secondary-300"
              )}
            />
            <Check className="absolute top-0.5 left-0.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
          </div>
          <span className="text-sm text-secondary-700">{label}</span>
        </label>
        {error && <p className="mt-1 text-sm text-red-600 ml-8">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
