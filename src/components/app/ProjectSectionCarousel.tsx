import { ProjectCard, ProjectCardFlat } from '@/components/app/ProjectCard';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Container } from '@/components/ui/container';
import { TypographyH2 } from '@/components/ui/typography';
import { getPropertiesByLabel } from '@/services/properties';
import { ProjectLabel } from '@/types/Property';
import { CityIds, ComponentWithCity } from '@/types/Shared';
import React, { FC, ReactNode } from 'react';

const ProjectSectionCarousel: FC<
  ComponentWithCity & {
    flatCard?: boolean;
    label: ProjectLabel;
    title: ReactNode;
  }
> = async ({ city, flatCard, label, title }) => {
  const properties = await getPropertiesByLabel(CityIds[city], {
    label,
    page: 1,
    per_page: 10,
  });
  const Card = flatCard ? ProjectCardFlat : ProjectCard;
  if (!properties.items.length) return null;
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
            <Button
              variant='primary-blue'
              className='w-[165px] h-[50px] rounded-lg'
            >
              See More
            </Button>
          </div>
        </div>
        <CarouselContent>
          {properties.items?.map((project, index) => (
            <CarouselItem key={index} className='lg:basis-auto ps-6'>
              <Card project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Container>
  );
};

export default ProjectSectionCarousel;
