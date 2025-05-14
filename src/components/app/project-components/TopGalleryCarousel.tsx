import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Chip } from '@/components/ui/chip';
import { PropertyModel } from '@/types/Property';
import Image from 'next/image';
import { FC } from 'react';
import moment from 'moment';

type TopGalleryCarouselProps = {
  property: PropertyModel;
};
const TopGalleryCarousel: FC<TopGalleryCarouselProps> = ({ property }) => {
  const currentDate = moment();
  const handoverDate = moment(property.handover_date);
  return (
    <Carousel opts={{ align: 'start' }} className=' relative'>
      <CarouselPrevious className='size-[50px] z-20 absolute top-[50%]  left-1 ' />
      <CarouselNext className='size-[50px] absolute z-20 top-[50%] right-5  ' />
      <div className='absolute  left-3 top-3 z-50 flex gap-[10px]'>
        {property.handover_date && (
          <Chip
            variant='flat'
            color='primary'
            className='uppercase py-1.5 px-2.5 h-auto rounded-full border-0 font-medium'
          >
            {currentDate.diff(handoverDate) > 0 ? 'Ready' : 'Off Plan'}
          </Chip>
        )}
        {property.unit_types?.map((type) => (
          <Chip
            key={type.id}
            variant='flat'
            color='primary-blue'
            className='uppercase py-1.5 px-2.5 h-auto rounded-full border-0 font-medium'
          >
            {type.name}
          </Chip>
        ))}
      </div>
      <CarouselContent className='relative max-h-[80dvh] '>
        {property.media?.map((image, index) => {
          if (!image.url?.preview) {
            return null;
          }
          if (image.mime_type.includes('image')) {
            return (
              <CarouselItem className='relative rounded-lg' key={index}>
                <Image
                  src={image.url?.preview}
                  alt={property.name}
                  width={1920}
                  height={1080}
                  className=' aspect-w-16 aspect-h-9 max-h-full rounded-lg'
                />
              </CarouselItem>
            );
          }

          if (image.mime_type.includes('video')) {
            return (
              <CarouselItem className='relative rounded-lg' key={index}>
                <video
                  src={image.url?.preview}
                  autoPlay
                  loop
                  muted
                  className='aspect-w-16 aspect-h-9 max-h-full rounded-lg'
                />
              </CarouselItem>
            );
          }
        })}
      </CarouselContent>
    </Carousel>
  );
};
export default TopGalleryCarousel;
