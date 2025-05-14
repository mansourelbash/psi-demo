"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { formatCityLabel } from "@/app/[locale]/[city]/(Home)/featured-projects-section/FeaturedProjectsSection";

interface MediaItem {
  original: string;
  preview: string;
  thumb: string;
}

interface DestinationShowcaseProps {
  media: MediaItem[] | null | undefined;
  city?: string;
}

export default function DestinationShowcase({
  media,
  city,
}: DestinationShowcaseProps) {
  const mainImages =
    media?.map((item) => ({
      src: item.preview,
      alt: "Preview Image",
    })) || [];

  const thumbnails =
    media?.map((item) => ({
      src: item.thumb,
      alt: "Thumbnail Image",
    })) || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goToPrevious = () => {
    if (mainImages.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mainImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    if (mainImages.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === mainImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const openModalAt = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const currentImage = mainImages[currentIndex] || {
    src: "/images/locations/location3.png",
    alt: "Placeholder",
  };

  return (
    <div className="container mx-auto p-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="xl:col-span-10 lg:col-span-12 relative rounded-lg overflow-hidden">
          <div className="relative h-[700px] w-full">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-[#e05729] text-white font-regular text-[14px] px-3 py-1 rounded-full">
                {formatCityLabel(`${city}`) || "Abu Dhabi"}
              </span>
              {/* <span className="bg-[#1e1a4a] text-white font-regular text-[14px] px-3 py-1 rounded-full">
              {mainImages.length > 0 ? `${currentIndex + 1} / ${mainImages.length}` : 'Default'}
              </span>  */}
            </div>

            {mainImages.length > 0 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
                  onClick={goToPrevious}
                >
                  <CaretLeft size={18} />
                </Button>

                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white"
                  onClick={goToNext}
                >
                  <CaretRight size={18} />
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-[20px] overflow-y-auto max-h-[700px]">
          {thumbnails.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className={cn(
                "relative rounded-lg overflow-hidden cursor-pointer flex-shrink-0 h-[160px] w-full",
                currentIndex === index && "border-4 border-[#e05729]"
              )}
              onClick={() => openModalAt(index)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt || "Thumbnail"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 180px, 150px"
              />
              {index === 3 && mainImages.length > 0 && (
                <button
                  type="button"
                  className="absolute bottom-2 right-2 bg-white bg-opacity-90 text-gray-800 text-sm font-semibold rounded-md shadow-md px-3 py-1 flex items-center space-x-1 hover:bg-opacity-100 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModalAt(0);
                  }}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>{mainImages.length} Photos</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && mainImages.length > 0 && (
        <div className="fixed inset-0 bg-black/50 z-50 flex flex-col items-center justify-center p-8">
          <button
            className="absolute top-8 right-8 text-white"
            onClick={() => setIsModalOpen(false)}
          >
            <X size={30} />
          </button>

          <div className="relative w-full max-w-4xl h-[70vh] mb-4">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-contain"
            />
          </div>

          <div className="flex gap-4">
            <Button variant="secondary" onClick={goToPrevious}>
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button variant="secondary" onClick={goToNext}>
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="flex gap-4 mt-6 overflow-x-auto max-w-4xl">
            {thumbnails.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "relative min-w-[40%] sm:min-w-[150px] h-[80px] sm:h-[100px] cursor-pointer rounded overflow-hidden",
                  idx === currentIndex && "ring-2 ring-[#e05729]"
                )}
              >
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt || "Thumbnail"}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
