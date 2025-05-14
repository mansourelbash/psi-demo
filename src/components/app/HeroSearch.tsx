import React, { ReactNode } from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  backgroundImage: string;
  searchComponents?: ReactNode;
}

const HeroSearch: React.FC<HeroSectionProps> = ({ title, backgroundImage, searchComponents }) => {
  return (
    <section className="relative min-h-[400px] w-full bg-cover bg-center my-[30px]">
      <Image
        src={backgroundImage}
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 rounded-[20px] xs:mx-5px"
      />
      <div className="absolute inset-0">
        <div className="container w-full lg:w-[95%] md:w-[95%] flex h-full flex-col items-center justify-center px-4">
          <h1 className="mb-8 text-3xl font-bold text-white">{title}</h1>
          {searchComponents && (
            <div className="w-full max-w-6xl rounded-lg bg-white p-4 shadow-lg">
            
                {searchComponents}
              
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSearch;
