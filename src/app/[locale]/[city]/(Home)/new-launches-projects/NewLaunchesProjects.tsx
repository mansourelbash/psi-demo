import { ProjectCardFlat } from '@/components/app/ProjectCard';
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
import { getPropertiesByLabel } from '@/services/properties';
import { CityIds } from '@/types/Shared';
import { FC } from 'react';

type NewLaunchesProjectsProps = {
  city: keyof typeof CityIds;
};
export const NewLaunchesProjects: FC<NewLaunchesProjectsProps> = async ({
  city,
}) => {
  const properties = await getPropertiesByLabel(CityIds[city], {
    label: 'NEW_LAUNCHES',
    page: 1,
    per_page: 10,
  });
  if (!properties.items.length) return null;
  return (
    <Container>
      <Carousel opts={{ align: 'start' }} className='w-full space-y-[30px]'>
        <div className='flex justify-between gap-2'>
          <TypographyH2>
            <TextHighlight>New Launches</TextHighlight> Projects {city}
          </TypographyH2>
          <div className='flex gap-3 items-center'>
            <div className='flex gap-3'>
              <CarouselPrevious className='size-[50px] relative top-0 left-0 right-0 translate-y-0' />
              <CarouselNext className='size-[50px] relative top-0 left-0 right-0 translate-y-0' />
            </div>
            <Button
              variant='primary-blue'
              className='w-[165px] h-[50px] rounded-lg'
            >
              See More
            </Button>
          </div>
        </div>
        <CarouselContent>
          {properties.items?.map((_, index) => (
            <CarouselItem key={index} className='lg:basis-auto ps-6'>
              <ProjectCardFlat />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Container>
  );
};
