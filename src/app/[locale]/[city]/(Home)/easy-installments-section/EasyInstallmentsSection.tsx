import { ProjectCard } from "@/components/app/ProjectCard";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Container } from "@/components/ui/container";
import { TextHighlight, TypographyH2 } from "@/components/ui/typography";
import { getPropertiesByLabel } from "@/services/properties";
import { CityIds, ComponentWithCity } from "@/types/Shared";
import { FC } from "react";

export const EasyInstallmentsSection: FC<ComponentWithCity> = async ({
  city,
}) => {
  const properties = await getPropertiesByLabel(CityIds[city], {
    label: "WITH_PAYMENT_PLANS",
    page: 1,
    per_page: 10,
  });
  if (!properties.items?.length) return null;
  return (
    <Container>
      <Carousel opts={{ align: "start" }} className="w-full space-y-[30px]">
        <div className="flex justify-between items-center gap-2 flex-wrap">
          <TypographyH2 className="w-full sm:w-auto">
            Discover Projects <TextHighlight>Easy Installments</TextHighlight>{" "}
            in {city}
          </TypographyH2>
          <div className="flex gap-3 items-center w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0">
            <div className="flex gap-3">
              <CarouselPrevious className="size-[50px] relative top-0 left-0 right-0 translate-y-0" />
              <CarouselNext className="size-[50px] relative top-0 left-0 right-0 translate-y-0" />
            </div>
            <Button
              variant="primary-blue"
              className="w-full sm:w-[165px] h-[50px] rounded-lg mt-2 sm:mt-0"
            >
              See More
            </Button>
          </div>
        </div>

        <CarouselContent>
          {properties.items?.map((project, index) => (
            <CarouselItem key={index} className="lg:basis-auto ps-6">
              <ProjectCard project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Container>
  );
};
