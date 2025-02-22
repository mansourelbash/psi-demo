import { FC, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { MediaModel } from '@/types/Shared';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

type GalleryProps = {
  images: MediaModel[];
  open: boolean;
  setOpen: (open: boolean) => void;
};

type ImagesCarouselProps = {
  images: MediaModel[];
  setActiveImage: (index: number) => void;
};
const ImagesCarousel: FC<ImagesCarouselProps> = ({
  images,
  setActiveImage,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        top: 0,
        left: direction === 'left' ? -250 : 250,
        behavior: 'smooth',
      });
    }
  };
  const onImageClick = (index: number) => {
    setActiveImage(index);
    if (scrollRef.current) {
      scrollRef.current?.scrollTo({
        left: scrollRef.current?.scrollWidth * (index / images.length) - 100,
        behavior: 'smooth',
      });
    }
  };
  return (
    <div className='flex h-2/5 gap-2'>
      <Button
        className='flex items-center justify-center  cursor-pointer self-center bg-transparent text-gray-500 hover:bg-gray-200 '
        onClick={() => scroll('left')}
        disabled={scrollRef.current?.scrollLeft === 0}
      >
        <ArrowLeft className='w-6 h-6' />
      </Button>
      <div
        className='flex flex-no-wrap gap-4 overflow-auto p-2 scrollbar-none scroll-smooth'
        ref={scrollRef}
      >
        {images.map(
          (image, index) =>
            image.url?.preview && (
              <Image
                key={index}
                src={image.url?.preview}
                alt={image.category.name}
                className='size-full object-cover h-full aspect-square'
                onClick={() => onImageClick(index)}
                width={200}
                height={200}
              />
            )
        )}
      </div>
      <Button
        className='flex items-center justify-center  cursor-pointer self-center bg-transparent text-gray-500 hover:bg-gray-200 '
        onClick={() => scroll('right')}
        disabled={
          !!scrollRef.current &&
          scrollRef.current.scrollLeft === scrollRef.current.scrollWidth!
        }
      >
        <ArrowRight className='w-6 h-6' />
      </Button>
    </div>
  );
};

const GalleryDialog: FC<GalleryProps> = ({ images, open, setOpen }) => {
  const [activeImageIndex, setActiveImage] = useState<number>(0);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='min-w-[800px]'>
        <DialogHeader>
          <DialogTitle>Gallery</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4 overflow-auto h-[500px] p-4'>
          <div className='flex h-3/5 w-full  flex-col gap-4'>
            {images[activeImageIndex].url?.preview && (
              <Image
                src={images[activeImageIndex].url?.preview}
                alt='Living room'
                className='size-full object-cover'
                width={1000}
                height={1000}
              />
            )}
          </div>
          <ImagesCarousel setActiveImage={setActiveImage} images={images} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryDialog;
