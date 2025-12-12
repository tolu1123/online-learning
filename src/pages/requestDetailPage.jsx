import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";
import {
  User,
  Video,
  CheckCircle2,
  Copy,
  ExternalLink,
  Clock,
  MessageSquare,
} from "lucide-react";
import { cn } from "../lib/utils";
import AttachFileButton from "@/components/universal/AttachFileButton";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { useFetcher } from "react-router-dom";

const formSchema = z.object({
  solution: z.string().min(30, "Solution must be at least 30 characters."),
  image: z.array(z.any()).optional(), // handles multiple files
});

export function RequestDetailPage() {
  // eslint-disable-next-line
  const { id } = useParams();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  // Mock data
  const request = {
    id: "1",
    topic: "Linear Algebra: Eigenvalues",
    subject: "Mathematics",
    status: "In Progress",
    student: "Alex M.",
    date: "2 hours ago",
    description:
      "I'm struggling to understand how to calculate eigenvalues for 3x3 matrices. Need help preparing for finals. I understand the concept for 2x2 matrices but get confused with the determinant calculations for larger matrices.",
  };
  // eslint-disable-next-line
  const [solutions, setSolutions] = useState([
    {
      id: "1",
      explainer: "Sarah J.",
      time: "1 hour ago",
      text: "Start by finding the characteristic polynomial det(A - λI) = 0. For a 3x3 matrix, this gives you a cubic equation. Use the cofactor expansion method along the first row to simplify the determinant calculation.",
      isCorrect: false,
    },
    {
      id: "2",
      explainer: "Mike T.",
      time: "30 minutes ago",
      text: "Here's a step-by-step approach: 1) Write out (A - λI), 2) Calculate det(A - λI) using cofactor expansion, 3) Solve the resulting cubic equation. For your finals, memorize the cofactor expansion formula and practice with sample problems. Happy to do a video session to walk through examples!",
      isCorrect: true,
    },
  ]);
  const googleMeetLink = "https://meet.google.com/abc-defg-hij";
  const handleCopyLink = () => {
    navigator.clipboard.writeText(googleMeetLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const fetcher = useFetcher();

  const markFetcher = useFetcher();

  const markSolution = (solutionId) => {
    markFetcher.submit(
      { solutionId },
      {
        method: "post",
        action: `/requests/${id}/mark-solution`,
      }
    );
  };

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

    formData.append("solution", values.solution);
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
        toast.success("Your solution has been submitted!");
        reset();
      }
    }

    prevState.current = fetcher.state;
  }, [fetcher.state, fetcher.data, reset, errors.server]);

  return (
    <div className='min-h-screen bg-gray-50'>
      <main className='container mx-auto px-4 py-8 max-w-4xl'>
        {/* Request Header */}
        <Card className='mb-8'>
          <CardHeader>
            <div className='flex flex-col md:flex-row justify-between items-start gap-4 mb-4'>
              <div className='space-y-2'>
                <div className='flex gap-2'>
                  <Badge variant='secondary'>{request.subject}</Badge>
                  <Badge variant='info'>{request.status}</Badge>
                </div>
                <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>
                  {request.topic}
                </h1>
              </div>
              <Button
                onClick={() => setIsVideoModalOpen(true)}
                className='gap-2 shrink-0'
              >
                <Video className='h-4 w-4' /> Start Video Session
              </Button>
            </div>

            <div className='flex items-center gap-2 text-sm text-gray-500 border-b border-gray-100 pb-4 mb-4'>
              <div className='h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center'>
                <User className='h-4 w-4 text-gray-600' />
              </div>
              <span className='font-medium text-gray-900'>
                {request.student}
              </span>
              <span>•</span>
              <span className='flex items-center gap-1'>
                <Clock className='h-3 w-3' /> {request.date}
              </span>
            </div>

            <p className='text-gray-700 leading-relaxed whitespace-pre-wrap'>
              {request.description}
            </p>
          </CardHeader>
        </Card>

        {/* Solutions Section */}
        <div className='space-y-6 mb-8'>
          <h2 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
            <MessageSquare className='h-5 w-5' />
            Solutions ({solutions.length})
          </h2>

          {solutions.length === 0 ? (
            <div className='text-center py-12 bg-white rounded-xl border border-gray-200 border-dashed'>
              <p className='text-gray-500'>
                No solutions yet. Be the first to help!
              </p>
            </div>
          ) : (
            solutions.map((solution) => (
              <Card
                key={solution.id}
                className={cn(
                  "transition-all",
                  solution.isCorrect &&
                    "border-l-4 border-l-green-500 bg-green-50/10"
                )}
              >
                <CardContent className='pt-6'>
                  <div className='flex justify-between items-start gap-4 mb-4'>
                    <div className='flex items-center gap-2'>
                      <div className='h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center'>
                        <User className='h-4 w-4 text-gray-600' />
                      </div>
                      <div>
                        <p className='text-sm font-medium text-gray-900'>
                          {solution.explainer}
                        </p>
                        <p className='text-xs text-gray-500'>{solution.time}</p>
                      </div>
                    </div>
                    {solution.isCorrect && (
                      <Badge variant='success' className='gap-1'>
                        <CheckCircle2 className='h-3 w-3' /> Accepted Solution
                      </Badge>
                    )}
                  </div>

                  <p className='text-gray-700 mb-6 whitespace-pre-wrap'>
                    {solution.text}
                  </p>

                  {!solution.isCorrect && (
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => markSolution(solution.id)}
                      className='text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200'
                    >
                      Mark as Correct
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Add Solution Form */}
        {request.status !== "Completed" && (
          <Card>
            <CardHeader>
              <CardTitle className='text-lg'>Submit Your Solution</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div className='relative'>
                  <textarea
                    name='solution'
                    className='flex min-h-40 w-full rounded-md border border-gray-200 bg-white px-3 pt-2 pb-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950'
                    placeholder='Explain your approach and solution...'
                    // required
                    {...register("solution")}
                  />
                  <AttachFileButton
                    value={watch("image")}
                    onChange={(files) => setValue("image", files)}
                  />
                </div>
                {errors.solution && (
                  <p className='text-red-600 text-sm'>
                    {errors.solution.message}
                  </p>
                )}
                {errors.image && (
                  <p className='text-red-600 text-sm'>{errors.image.message}</p>
                )}
                <div className='flex justify-end'>
                  <Button type='submit' disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Solution"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Video Call Modal */}
      <Modal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title='Join Video Session'
        className=""
      >
        <div className='space-y-6'>
          <div className='text-center space-y-2'>
            <div className='h-12 w-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4'>
              <Video className='h-6 w-6' />
            </div>
            <h3 className='font-semibold text-gray-900'>
              Ready to start the session?
            </h3>
            <p className='text-sm text-gray-500'>
              Share this link with your peer to start the video call.
            </p>
          </div>

          <div className='flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200'>
            <code className='text-sm flex-1 font-mono text-gray-600 truncate'>
              {googleMeetLink}
            </code>
            <Button
              variant='ghost'
              size='icon'
              onClick={handleCopyLink}
              className='h-8 w-8 shrink-0'
            >
              {isCopied ? (
                <CheckCircle2 className='h-4 w-4 text-green-500' />
              ) : (
                <Copy className='h-4 w-4' />
              )}
            </Button>
          </div>

          <div className='flex gap-3'>
            <Button
              variant='outline'
              className='flex-1'
              onClick={() => setIsVideoModalOpen(false)}
            >
              Cancel
            </Button>
            <a
              href={googleMeetLink}
              target='_blank'
              rel='noopener noreferrer'
              className='flex-1'
            >
              <Button className='w-full gap-2'>
                Open Meeting <ExternalLink className='h-4 w-4' />
              </Button>
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
}
