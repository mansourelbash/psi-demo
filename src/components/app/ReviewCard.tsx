import { ReviewCardProps } from '@/types/agent';
import { Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const ReviewCard: React.FC<ReviewCardProps> = ({ text }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <div className="flex justify-between gap-2 mb-3">
        <div>
          <Image
            src="/images/google-logo.png"
            alt="Google"
            width={60}
            height={20}
            className="object-contain"
          />
          <h3 className="text-2xl font-bold text-[#414042] mt-2">Google</h3>
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#E0592A] stroke-[#E0592A]" />
          ))}
        </div>
      </div>
      <p className="text-sm text-[#414042]">{text}</p>
    </div>
  );
};

export default ReviewCard;
