import React from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

export function Modal({ isOpen, onClose, title, className, children }) {
  if (!isOpen) return null;
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200'>
      <div
        className={cn(
          "relative w-full max-w-lg rounded-xl bg-white p-6 shadow-lg animate-in zoom-in-95 duration-200",
          className
        )}
      >
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold leading-none tracking-tight'>
            {title}
          </h2>
          <Button
            variant='ghost'
            size='icon'
            onClick={onClose}
            className='h-8 w-8 rounded-full'
          >
            <X className='h-4 w-4' />
            <span className='sr-only'>Close</span>
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
