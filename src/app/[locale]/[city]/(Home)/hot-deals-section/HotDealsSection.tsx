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
import { getUnits } from '@/services/units';
import { CityIds } from '@/types/Shared';
import { formatCityLabel } from '../featured-projects-section/FeaturedProjectsSection';

type Props = {
  operation: 'SALE' | 'RENT';
  city: keyof typeof CityIds;
};
export const HotDealsSection = async ({ operation, city }: Props) => {
  const units = await getUnits(operation, CityIds[city]);
  if (!units.length) return null;
  return (
    <Container>
      <Carousel opts={{ align: 'start' }} className='w-full space-y-[30px]'>
      <div className="flex flex-wrap justify-between gap-2">
  <TypographyH2 className="w-full sm:w-auto">
    Discover the <TextHighlight>Hot Deals</TextHighlight> Units For{' '}
    <span className="capitalize">{operation.toLowerCase()}</span> in{' '}
    {formatCityLabel(city)}
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
