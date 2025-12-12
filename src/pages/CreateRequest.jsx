import { useEffect, useRef } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useFetcher } from "react-router-dom";
import MyDropzone from "@/components/universal/MyDropzone"; // adjust path if needed

const formSchema = z.object({
  topic: z.string().min(5, "Topic must be at least 5 characters."),
  subject: z.string().min(1, "Subject is required."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  image: z.array(z.any()).optional(), // handles multiple files
});

export default function CreateRequest() {
  const fetcher = useFetcher();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: [],
    },
  });

  const isSubmitting = fetcher.state === "submitting";

  const onSubmit = (values) => {
    const formData = new FormData();

    formData.append("topic", values.topic);
    formData.append("subject", values.subject);
    formData.append("description", values.description);

    // Append images
    values.image?.forEach((file) => {
      formData.append("image", file);
    });

    fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  };

  // Handle server errors
  if (fetcher.data?.error && !errors.server) {
    setError("server", { message: fetcher.data.error });
  }

  // Use this to detect successful event and display toast
  const prevState = useRef(fetcher.state);
  useEffect(() => {
    // Detect transition from submitting → idle
    if (prevState.current === "submitting" && fetcher.state === "idle") {
      if (fetcher.data?.success) {
        toast.success("Your request has been created!");
        reset();
      }
    }

    prevState.current = fetcher.state;
  }, [fetcher.state, fetcher.data, reset, errors.server]);

  return (
    <div className='min-h-screen bg-gray-50'>
      <main className='container mx-auto px-4 py-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>
          Create New Request
        </h2>

        <form
          className='grid gap-4 md:grid-cols-2'
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Topic */}
          <div className='space-y-2'>
            <label className='text-sm font-medium' htmlFor='topic'>
              Topic
            </label>
            <Input
              id='topic'
              placeholder='e.g. Linear Algebra Help'
              {...register("topic")}
            />
            {errors.topic && (
              <p className='text-red-600 text-sm'>{errors.topic.message}</p>
            )}
          </div>

          {/* Subject */}
          <div className='space-y-2'>
            <label className='text-sm font-medium' htmlFor='subject'>
              Subject
            </label>
            <select
              id='subject'
              {...register("subject")}
              className='h-10 w-full rounded-md border border-gray-200 px-3 py-2 text-sm'
            >
              <option value=''>Select a subject...</option>
              <option value='Mathematics'>Mathematics</option>
              <option value='Computer Science'>Computer Science</option>
              <option value='Physics'>Physics</option>
            </select>
            {errors.subject && (
              <p className='text-red-600 text-sm'>{errors.subject.message}</p>
            )}
          </div>

          {/* Description */}
          <div className='md:col-span-2 space-y-2'>
            <label className='text-sm font-medium'>Description</label>
            <textarea
              {...register("description")}
              className='min-h-36 w-full rounded-md border border-gray-200 px-3 py-2 text-sm'
              placeholder='Describe what you need help with...'
            />
            {errors.description && (
              <p className='text-red-600 text-sm'>
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Images (Dropzone) */}
          <div className='md:col-span-2 space-y-3'>
            <label className='text-sm font-medium'>
              Attach Images (optional)
            </label>
            
            <MyDropzone
              value={watch("image")}
              onChange={(files) => setValue("image", files)}
            />

            {errors.image && (
              <p className='text-red-600 text-sm'>{errors.image.message}</p>
            )}
          </div>

          {/* Server error */}
          {errors.server && (
            <p className='text-red-600 text-sm md:col-span-2'>
              {errors.server.message}
            </p>
          )}

          {/* Submit */}
          <div className='md:col-span-2 flex justify-end'>
            <Button disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}