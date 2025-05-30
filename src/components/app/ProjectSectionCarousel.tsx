import { ProjectCard, ProjectCardFlat } from "@/components/app/ProjectCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TypographyH2 } from "@/components/ui/typography";
import { getPropertiesByLabel } from "@/services/properties";
import { ProjectLabel } from "@/types/Property";
import { CityIds, ComponentWithCity } from "@/types/Shared";
import React, { FC, ReactNode } from "react";

const ProjectSectionCarousel: FC<
  ComponentWithCity & {
    flatCard?: boolean;
    label?: ProjectLabel;
    title: ReactNode;
    showSeeMore?: boolean;
    community_id?: string
    city?: string
    
  }
> = async ({ city, flatCard, label, title, showSeeMore, community_id }) => {
  const properties = await getPropertiesByLabel(CityIds[city], {
    label,
    page: 1,
    per_page: 10,
    community_id
  });
  const Card = flatCard ? ProjectCardFlat : ProjectCard;
  if (!properties.items.length) return null;
  return (
    <>
      <Carousel opts={{ align: "start" }} className="w-full space-y-[30px]">
        <div className="flex flex-wrap justify-between gap-2">
          <TypographyH2 className="w-full sm:w-auto">{title}</TypographyH2>
          <div className="flex gap-3 items-center w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0">
            <div className="flex gap-3">
              <CarouselPrevious className="size-[50px] relative top-0 left-0 right-0 translate-y-0" />
              <CarouselNext className="size-[50px] relative top-0 left-0 right-0 translate-y-0" />
            </div>
            {showSeeMore && (
              <Button
                variant="primary-blue"
                className="w-full sm:w-[165px] h-[50px] rounded-lg mt-2 sm:mt-0"
              >
                See More
              </Button>
            )}
          </div>
        </div>

        <CarouselContent>
          {properties.items?.map((project, index) => (
            <CarouselItem key={index} className="lg:basis-auto ps-6">
              <Card project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default ProjectSectionCarousel;
