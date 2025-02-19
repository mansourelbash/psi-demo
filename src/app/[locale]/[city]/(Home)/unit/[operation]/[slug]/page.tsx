import { Container } from '@/components/ui/container';
import { getPropertySummary } from '@/services/properties';
import { getUnit } from '@/services/units';
import { GallerySection } from './gallery-section/GallerySection';
import { Separator } from '@/components/ui/separator';
import { DetailsSection } from './details-section/DetailsSection';
import { ToolbarSection } from './toolbar-section/ToolbarSection';
import { DescriptionSection } from './description-section/DescriptionSection';
import { ProjectSummerySection } from './project-summery-section/ProjectSummerySection';
import { PropertyOverviewSection } from './property-overview-section/PropertyOverviewSection';
import { AmenitiesSection } from './amenities-section/AmenitiesSection';
import { FixturesSection } from './fixtures-section/FixturesSection';
import { FloorSection } from './floor-section/FloorSection';
import { NearbySection } from './nearby-section/NearbySection';
import { MortgageCalculatorSection } from './mortgage-calculator-section/MortgageCalculatorSection';
import { CityIds, OperationType } from '@/types/Shared';
import ListingAgentCard from './listing-agent/ListingAgentCard';
import UnitsSectionCarousel from '@/components/app/UnitsSectionCarousel';
import { TextHighlight } from '@/components/ui/typography';
import ProjectSectionCarousel from '@/components/app/ProjectSectionCarousel';
import { getInterestRate } from '@/services/mortgage';
import SubmitInquiry from './submit-inquiry/SubmitInquiry';
import RegulatoryInformation from './regulatory-information/RegulatoryInformation';
import Banner from './banner/Banner';

type UnitProps = {
  params: Promise<{
    slug: string;
    operation: OperationType;
    city: keyof typeof CityIds;
  }>;
};

export default async function Unit({ params }: UnitProps) {
  const { slug, operation, city } = await params;
  const unit = await getUnit(operation, slug);
  const property = await getPropertySummary(unit.property_id.toString());
  const initialInterest = await getInterestRate();
  const breadcrumbData = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: unit.city.name,
      href: `/units/?operation-type=${operation}&city=${unit.city.id}`,
    },
    {
      name: unit.community?.name ?? '',
      href: `/units/?operation-type=${operation}&city=${
        unit.city.id
      }&community=${unit.community?.id ?? ''}`,
    },
    {
      name: unit.property_name,
      href: `/units/?operation-type=${operation}&city=${
        unit.city.id
      }&community=${unit.community?.id ?? ''}&project=${property.id}`,
    },
  ];

  return (
    <main className='py-[70px]'>
      <ToolbarSection breadcrumbData={breadcrumbData} />
      <GallerySection unit={unit} />
      <Container className='mt-[70px] grid grid-cols-12 gap-6'>
        <div className='col-span-9'>
          <DetailsSection unit={unit} property={property} />
          <Separator className='my-10 w-[90%]' />
          <PropertyOverviewSection unit={unit} />
          <Separator className='my-10 w-[90%]' />
          <DescriptionSection unit={unit} />
          <Separator className='my-10 w-[90%]' />
          <ProjectSummerySection property={property} />
          <Separator className='my-10 w-[90%]' />
          <AmenitiesSection unit={unit} />
          <Separator className='my-10 w-[90%]' />
          <FixturesSection unit={unit} />
          <Separator className='my-10 w-[90%]' />
          <FloorSection unit={unit} />
          <NearbySection unit={unit} />
          <MortgageCalculatorSection
            unit={unit}
            initialInterest={initialInterest}
          />
        </div>
        <div className='col-span-3 flex flex-col gap-9'>
          <ListingAgentCard unitId={unit.id} operation={operation} />
          <SubmitInquiry
            unitTypeId={unit.unit_type!.id!}
            propertyId={unit.property_id}
            bedrooms={unit.bedrooms}
            bathrooms={unit.bathrooms}
          />
          <RegulatoryInformation />
          <Banner />
        </div>
        <div className='col-span-12 flex flex-col gap-16'>
          <UnitsSectionCarousel
            operation='SALE'
            city={city}
            title={
              <>
                Available Units in {unit.community?.name}{' '}
                <TextHighlight>For Sale</TextHighlight>
              </>
            }
          />
          <UnitsSectionCarousel
            operation='RENT'
            city={city}
            title={
              <>
                Available Units in {unit.community?.name}{' '}
                <TextHighlight>For Rent</TextHighlight>
              </>
            }
          />
          <ProjectSectionCarousel
            city={city}
            label='RESIDENTIAL'
            title={'Residential Projects'}
            flatCard
          />
        </div>
      </Container>
    </main>
  );
}
