import { CityIds } from '@/types/Shared';
import { FC } from 'react';
import { ToolbarSection } from '../../unit/[operation]/[slug]/toolbar-section/ToolbarSection';
import { getDeveloperByProperty, getProperty } from '@/services/properties';
import { Container } from '@/components/ui/container';
import TopGalleryCarousel from '@/components/app/project-components/TopGalleryCarousel';
import ProjectMainInfo from '@/components/app/project-components/ProjectMainInfo';
import { Separator } from '@radix-ui/react-separator';
import ProjectDetails from '@/components/app/project-components/ProjectDetails';
import ProjectDescription from '@/components/app/project-components/ProjectDescription';
import ProjectFacts from '@/components/app/project-components/ProjectFacts';
import ProjectGallery from '@/components/app/project-components/ProjectGallery';
import UnitsSectionCarousel from '@/components/app/UnitsSectionCarousel';
import { TextHighlight } from '@/components/ui/typography';
import ProjectAmenities from '@/components/app/project-components/ProjectAmenities';
import ProjectMap from '@/components/app/project-components/ProjectMap';
import ProjectMasterPlan from '@/components/app/project-components/ProjectMasterPlan';
import ProjectFloorPlans from '@/components/app/project-components/ProjectFloorPlans';
import ProjectPaymentPlans from '@/components/app/project-components/ProjectPaymentPlans';
import ProjectDeveloper from '@/components/app/project-components/ProjectDeveloper';
import ProjectSectionCarousel from '@/components/app/ProjectSectionCarousel';
import ProjectSubmitInquiry from '@/components/app/project-components/ProjectSubmitInquiry';
import ProjectBrochure from '@/components/app/project-components/ProjectBrochure';
import ProjectBanners from '@/components/app/project-components/ProjectBanners';

interface PropertyPageModel {
  params: Promise<{
    slug: string;
    city: keyof typeof CityIds;
  }>;
}
const Property: FC<PropertyPageModel> = async ({ params }) => {
  const { slug, city } = await params;
  const property = await getProperty(slug);
  const developer = await getDeveloperByProperty(property.id);
  

  const breadcrumbData = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: property.city.name,
      href: `/property/?city=${property.city.id}`,
    },
    {
      name: property.community?.name ?? '',
      href: `/property/?city=${property.city.id}&community=${
        property.community?.id ?? ''
      }`,
    },
    {
      name: property.name,
      href: `/property?city=${property.city.id}&community=${
        property.community?.id ?? ''
      }&project=${property.id}`,
    },
  ];
  return (
    <main className='py-[70px]'>
      <ToolbarSection breadcrumbData={breadcrumbData} />
      <Container className='mt-[70px] grid grid-cols-12 gap-6 justify-center'>
        <div className='col-span-12 lg:col-span-9 flex flex-col gap-20 '>
          <TopGalleryCarousel property={property} />
          <ProjectMainInfo property={property} />
          <Separator className=' w-[90%] bg-[#ECECEC] h-[1px] ' />
          <ProjectDetails property={property} />
          <Separator className=' w-[90%] bg-[#ECECEC] h-[1px] ' />
          <ProjectDescription property={property} />
          <Separator className=' w-[90%] bg-[#ECECEC] h-[1px] ' />
          <ProjectFacts property={property} />
          <ProjectGallery property={property} />
          <UnitsSectionCarousel
            city={city}
            property_id={property.id.toString()}
            operation='SALE'
            title={
              <>
                {property.name} for <TextHighlight>Sale</TextHighlight>
              </>
            }
          />
          <ProjectAmenities property={property} />
          <ProjectMap property={property} />
          <UnitsSectionCarousel
            city={city}
            property_id={property.id.toString()}
            operation='RENT'
            title={
              <>
                {property.name} for <TextHighlight>Rent</TextHighlight>
              </>
            }
          />
          <ProjectFloorPlans property={property} />
          <ProjectMasterPlan property={property} />
          <ProjectPaymentPlans property={property} />
          <ProjectDeveloper developer={developer} />
          <ProjectSectionCarousel
            city={city}
            title={
              <>
                Our Projects With <TextHighlight>Same Developer</TextHighlight>
              </>
            }
          />
        </div>
        <div className=' col-span-12 lg:col-span-3 flex flex-wrap gap-6 lg:flex-col justify-center lg:justify-start'>
          <ProjectSubmitInquiry property={property} />
          <ProjectBrochure property={property} />
          <ProjectBanners property={property} />
        </div>
        <div className='col-span-9'>
          <ProjectSectionCarousel
            city={city}
            label='TOP_PROJECTS'
            title={
              <>
                Top Projects in{' '}
                <TextHighlight>{property.city.name}</TextHighlight>
              </>
            }
            flatCard
          />
        </div>
      </Container>
    </main>
  );
};
export default Property;
