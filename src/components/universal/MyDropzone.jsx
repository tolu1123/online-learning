import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MyDropzone({ value, onChange }) {
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
          "border border-dashed border-black rounded-xl p-8 md:py-14 text-center cursor-pointer transition-colors text-black flex flex-col items-center justify-center gap-4",
          isDragActive ? "bg-muted" : "bg-background"
        )}
      >
        <input {...getInputProps()} disabled={value.length == 4} />
        <p className='t'>
          {isDragActive ? (
            "Drop files here..."
          ) : (
            <Upload className='size-7 text-black' />
          )}
        </p>
        <div className='flex flex-col gap-0.5'>
          <p className='text-sm'>
            Drag and drop files/images here, or click to select files.
          </p>
          <p className={`text-sm ${value.length === 4 && "text-destructive"}`}>
            (You are only able to upload a maximum of 4 files.)
          </p>
        </div>
      </div>

      {/* Preview List */}
      {value && value.length > 0 && (
        <ul className='mt-4 list-disc pl-5 text-sm text-muted-foreground'>
          {value.map((file, index) => (
            <li key={index} className='break-all flex gap-1'>
              {/* if the file has already been uploaded, just display the name */}
              {/* Or else display the file name */}
              <span className=''>
                {typeof file === "string" ? file : file.name}
              </span>
              {/* Onclicking we use this to remove the file */}
              <span
                className='inline-block cursor-pointer'
                onClick={() => {
                  onChange(value.filter((_, i) => i !== index));
                }}
              >
                {" "}
                <X className='text-black size-4' />
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
