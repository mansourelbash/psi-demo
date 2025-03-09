import { UnitCard } from "@/components/app/UnitCard";
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
import { Locale } from "@/i18n.config";
import { getUnits } from "@/services/units";
import { CityIds, ComponentWithCity } from "@/types/Shared";
import { FC } from "react";

export const HigherROISection: FC<
  ComponentWithCity & { locale: Locale }
> = async ({ city, locale }) => {
  const units = await getUnits("SALE", CityIds[city]);
  if (!units?.length) return null;
  return (
    <Container>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full space-y-[30px]"
      >
        <div className="flex flex-wrap justify-between gap-2 px-3">
          <TypographyH2 className="w-full sm:w-auto">
            Discover Units With <TextHighlight>Higher ROI</TextHighlight> in{" "}
            {city}
          </TypographyH2>
          <div className="flex gap-3 items-center w-full sm:w-auto mt-2 sm:mt-0">
            <div className="flex gap-3 w-full sm:w-auto">
              <CarouselPrevious className="size-[50px] relative top-0 left-0 right-0 translate-y-0" />
              <CarouselNext className="size-[50px] relative top-0 left-0 right-0 translate-y-0" />
            </div>
            <Button
              variant="primary-blue"
              className="w-[165px] h-[50px] rounded-lg mt-2 sm:mt-0"
            >
              See More
            </Button>
          </div>
        </div>

        <CarouselContent>
          {units?.map((unit, index) => (
            <CarouselItem key={index} className="lg:basis-auto ps-6">
              <UnitCard unit={unit} locale={locale} operation="SALE" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Container>
  );
};
