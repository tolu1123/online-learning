"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useFetcher } from "react-router-dom";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(4, "Password must be at least 10 characters."),
});

export function LoginForm({ className, ...props }) {
  const fetcher = useFetcher();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isSubmitting = fetcher.state === "submitting";

  const onSubmit = (values) => {
    const formData = new FormData();

    formData.append("email", values.email);
    formData.append("password", values.password);
    
    fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
    });
  };

  // Handle server errors
  if (fetcher.data?.error && !form.errors.server) {
    form.setError("server", { message: fetcher.data.error });
  }

  // Use this to detect successful event and display toast
  const prevState = useRef(fetcher.state);
  useEffect(() => {
    // Detect transition from submitting → idle
    if (prevState.current === "submitting" && fetcher.state === "idle") {
      if (fetcher.data?.success) {
        toast.success(fetcher.data.message);
        form.reset();
      }
    }
    prevState.current = fetcher.state;
  }, [fetcher.state, fetcher.data, form]);

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={form.handleSubmit(onSubmit)}
      {...props}
    >
      <FieldGroup>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h1 className='text-2xl font-bold'>Login to your account</h1>
          <p className='text-muted-foreground text-sm text-balance'>
            Enter your email below to login to your account
          </p>
        </div>
        <Controller
          name='email'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor='email'>Email</FieldLabel>
              <Input
                {...field}
                id='email'
                type='email'
                placeholder='m@example.com'
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name='password'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <div className='flex items-center'>
                <FieldLabel htmlFor='password'>Password</FieldLabel>
              </div>
              <Input {...field} id='password' type='password' />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Login"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className='text-center'>
            Don&apos;t have an account?{" "}
            <Link to='/sign-up' className='underline underline-offset-4'>
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
