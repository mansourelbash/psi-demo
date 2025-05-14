'use client';

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  const router = useRouter();

  useEffect(() => {
    console.error("Error caught in error boundary:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[500px] text-center bg-gray-100 px-4">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h1>
      <p className="text-gray-600 mb-2">{error.message}</p> {/* This shows the actual error reason */}
      <p className="text-gray-500 mb-6">Please try again later or go back home.</p>
      <div className="flex gap-4">
        <Button color="primary" size="lg" onClick={() => router.push("/")}>
          Go Home
        </Button>
        <Button variant="outline" size="lg" onClick={() => reset()}>
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default Error;
