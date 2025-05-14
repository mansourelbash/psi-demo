import React, { FC, ReactNode } from 'react';

import { UnitCard } from '@/components/app/UnitCard';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { TypographyH2 } from '@/components/ui/typography';
import { getUnits } from '@/services/units';
import { CityIds, OperationType } from '@/types/Shared';

type Props = {
  operation: OperationType;
  city: keyof typeof CityIds;
  community_id?: string;
  title: string | ReactNode;
  showSeeMore?: boolean;
  property_id?: string;
  label?: "FEATURED" | "HOT_DEALS" | "HIGHER_ROI"
};

const UnitsSectionCarousel: FC<Props> = async ({
  operation,
  city,
  community_id,
  title,
  showSeeMore,
  property_id,
  label
}) => {
  const units = await getUnits(operation, CityIds[city], {
    community_id,
    property_id,
    label,
  });
  if (!units.length) return null;
  return (
    <>
      <Carousel opts={{ align: 'start' }} className='w-full space-y-[30px]'>
        <div className='flex justify-between gap-2'>
          <TypographyH2 className=' capitalize'>{title}</TypographyH2>
          <div className='flex gap-3 items-center'>
            <div className='flex gap-3'>
              <CarouselPrevious className='size-[50px] relative top-0 left-0 right-0 translate-y-0' />
              <CarouselNext className='size-[50px] relative top-0 left-0 right-0 translate-y-0' />
            </div>
            {showSeeMore && (
              <Button
                variant='primary-blue'
                className='w-[165px] h-[50px] rounded-lg'
              >
                See More
              </Button>
            )}
          </div>
        </div>
        <CarouselContent>
          {units?.map((unit, index) => (
            <CarouselItem key={index} className='lg:basis-auto ps-6'>
              <UnitCard unit={unit} operation={operation} route_to={`/unit/${operation}/${unit.id}`} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};
export default UnitsSectionCarousel;
