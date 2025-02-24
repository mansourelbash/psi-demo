'use client';

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

const Error = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-[500px] text-center bg-gray-100 px-4">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h1>
      <p className="text-gray-600 mb-6">We encountered an unexpected error. Please try again later.</p>
      <Button color="primary" size="lg" onClick={() => router.push("/")}>
        Go Home
      </Button>
    </div>
  );
};

export default Error;
