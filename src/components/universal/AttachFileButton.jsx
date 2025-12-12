import { useDropzone } from "react-dropzone";
import { Paperclip } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function AttachFileButton({ value, onChange }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
      onChange([...value, ...acceptedFiles]);
    },
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={cn(
          "absolute bottom-2 right-5 shadow-sm rounded-full p-2 text-center cursor-pointer transition-colors text-black flex flex-col items-center justify-center gap-4",
          isDragActive ? "bg-muted" : "bg-background"
        )}
      >
        <input {...getInputProps()} disabled={value.length == 4} />
        <Paperclip className="text-black size-5"/>
      </div>
    </>
  );
}
