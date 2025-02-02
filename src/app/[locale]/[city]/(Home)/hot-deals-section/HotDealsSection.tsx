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
import { CityIds } from '@/types/Shared';

type Props = {
  operation: 'SALE' | 'RENT';
  city: keyof typeof CityIds;
  locale: Locale;
};
export const HotDealsSection = async ({ operation, city, locale }: Props) => {
  const units = await getUnits(operation, CityIds[city]);
  if (!units.length) return null;
  return (
    <Container>
      <Carousel opts={{ align: 'start' }} className='w-full space-y-[30px]'>
        <div className='flex justify-between gap-2'>
          <TypographyH2>
            Discover the <TextHighlight>Hot Deals</TextHighlight> Units For{' '}
            <span className='capitalize'>{operation.toLowerCase()}</span> in{' '}
            {city}
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
