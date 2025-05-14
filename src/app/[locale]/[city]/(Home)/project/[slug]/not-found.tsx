'use client';

import { AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-[500px] text-center bg-gray-100 px-4">
      <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Project Not Found</h1>
      <p className="text-gray-600 mb-6">
        The project you are looking for doesn’t exist or has been removed.
      </p>
      <Button onClick={() => router.push('/')} size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
        Go to Home
      </Button>
    </div>
  );
};

export default NotFound;
