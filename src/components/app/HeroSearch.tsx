import React, { ReactNode } from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  backgroundImage: string;
  searchComponents?: ReactNode;
}

const HeroSearch: React.FC<HeroSectionProps> = ({ title, backgroundImage, searchComponents }) => {
  return (
    <section className="relative min-h-[400px] w-full bg-cover bg-center">
      <Image
        src={backgroundImage}
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 rounded-[20px]"
      />
      <div className="absolute inset-0">
        <div className="container mx-auto flex h-full flex-col items-center justify-center px-4">
          <h1 className="mb-8 text-3xl font-bold text-white">{title}</h1>
          {searchComponents && (
            <div className="w-full max-w-6xl rounded-lg bg-white/95 p-4 shadow-lg">
              <div className="grid gap-4 md:grid-cols-5 items-center">
                {searchComponents}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSearch;
