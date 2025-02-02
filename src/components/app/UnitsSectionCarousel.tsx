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
import { Container } from '@/components/ui/container';
import { TextHighlight, TypographyH2 } from '@/components/ui/typography';
import { Locale } from '@/i18n.config';
import { getUnits } from '@/services/units';
import { CityIds, OperationType } from '@/types/Shared';

type Props = {
  operation: OperationType;
  city: keyof typeof CityIds;
  community_id?: string;
  title: string | ReactNode;
  showSeeMore?: boolean;
};

const UnitsSectionCarousel: FC<Props> = async ({
  operation,
  city,
  community_id,
  title,
  showSeeMore,
}) => {
  const units = await getUnits(operation, CityIds[city], { community_id });
  if (!units.length) return null;
  return (
    <Container>
      <Carousel opts={{ align: 'start' }} className='w-full space-y-[30px]'>
        <div className='flex justify-between gap-2'>
          <TypographyH2>{title}</TypographyH2>
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
              <UnitCard unit={unit} operation={operation} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Container>
  );
};
export default UnitsSectionCarousel;
