import { CityIds } from "@/types/Shared";
import { FC } from "react";
import { ToolbarSection } from "../../unit/[operation]/[slug]/toolbar-section/ToolbarSection";
import { getDeveloperByProperty, getProperty } from "@/services/properties";
import { Container } from "@/components/ui/container";
import TopGalleryCarousel from "@/components/app/project-components/TopGalleryCarousel";
import ProjectMainInfo from "@/components/app/project-components/ProjectMainInfo";
import { Separator } from "@radix-ui/react-separator";
import ProjectDetails from "@/components/app/project-components/ProjectDetails";
import ProjectDescription from "@/components/app/project-components/ProjectDescription";
import ProjectFacts from "@/components/app/project-components/ProjectFacts";
import ProjectGallery from "@/components/app/project-components/ProjectGallery";
import UnitsSectionCarousel from "@/components/app/UnitsSectionCarousel";
import { TextHighlight } from "@/components/ui/typography";
import ProjectAmenities from "@/components/app/project-components/ProjectAmenities";
import ProjectMap from "@/components/app/project-components/ProjectMap";
import ProjectMasterPlan from "@/components/app/project-components/ProjectMasterPlan";
import ProjectFloorPlans from "@/components/app/project-components/ProjectFloorPlans";
import ProjectPaymentPlans from "@/components/app/project-components/ProjectPaymentPlans";
import ProjectDeveloper from "@/components/app/project-components/ProjectDeveloper";
import ProjectSectionCarousel from "@/components/app/ProjectSectionCarousel";
import ProjectSubmitInquiry from "@/components/app/project-components/ProjectSubmitInquiry";
import ProjectBrochure from "@/components/app/project-components/ProjectBrochure";
import ProjectBanners from "@/components/app/project-components/ProjectBanners";
import FAQSection from "@/components/app/project-components/FAQSection";

interface PropertyPageModel {
  params: Promise<{
    slug: string;
    city: keyof typeof CityIds;
  }>;
}
const Property: FC<PropertyPageModel> = async ({ params }) => {
  const { slug, city } = await params;
  const property = await getProperty(slug);
  let developer = null;
  try {
    developer = await getDeveloperByProperty(property?.id);
  } catch (error) {
    console.warn("Developer not found or failed to load", error);
    developer = null;
  }
  

  const breadcrumbData = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: property.city.name,
      href: `/property/?city=${property.city.id}`,
    },
    {
      name: property.community?.name ?? "",
      href: `/property/?city=${property.city.id}&community=${
        property.community?.id ?? ""
      }`,
    },
    {
      name: property.name,
      href: `/property?city=${property.city.id}&community=${
        property.community?.id ?? ""
      }&project=${property.id}`,
    },
  ];
  return (
    <main className="py-[70px]">

       <ToolbarSection breadcrumbData={breadcrumbData} />
       <Container className="mt-[20px] grid grid-cols-12 gap-6 justify-center">
        <div className="col-span-12 lg:col-span-9 flex flex-col gap-8 ">
          <TopGalleryCarousel property={property} />
          <ProjectMainInfo property={property} />
          <Separator className=" w-[90%] bg-[#ECECEC] h-[1px] " />
          <ProjectDetails property={property} />
          <Separator className=" w-[90%] bg-[#ECECEC] h-[1px] " />
          <ProjectDescription property={property} />
          <Separator className=" w-[90%] bg-[#ECECEC] h-[1px] " />
          <ProjectFacts property={property} />
          <ProjectGallery property={property} />
          <UnitsSectionCarousel
            city={city}
            property_id={property.id.toString()}
            operation="SALE"
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
            operation="RENT"
            title={
              <>
                {property.name} for <TextHighlight>Rent</TextHighlight>
              </>
            }
          />
          <ProjectFloorPlans property={property} />
          <ProjectMasterPlan property={property} />
          <ProjectPaymentPlans property={property} />
          {developer && <ProjectDeveloper developer={developer} />}
          <ProjectSectionCarousel
            city={city}
            title={
              <>
                Other Projects With <TextHighlight>Same Developer</TextHighlight>
              </>
            }
          />
        </div>
        <div className=" col-span-12 lg:col-span-3 flex flex-wrap gap-6 lg:flex-col justify-center lg:justify-start">
          <ProjectSubmitInquiry property={property} />
          <ProjectBrochure property={property} />
          <div className="border border-gray px-4 rounded-md">
            <h2 className="mb-3 text-[22px] mt-4">Useful Links : </h2>
            <ul className="list-disc px-3">
              <li className="text-[13px] mb-1 capitalize">property for sale in Abu Dhabi</li>
              <li className="text-[13px] mb-1 capitalize">freehold property for sale in Abu Dhabi</li>
              <li className="text-[13px] mb-1 capitalize">property for sale in Abu Dhabi for ex-pats</li>
              <li className="text-[13px] mb-1 capitalize">property for sale in Abu Dhabi UAE</li>
              <li className="text-[13px] mb-1 capitalize">property for sale in Al Reef Abu Dhabi</li>
              <li className="text-[13px] mb-1 capitalize">1 bedroom properties for sale in Abu Dhabi</li>
              <li className="text-[13px] mb-1 capitalize">property for sale in Abu Dhabi</li>
              <li className="text-[13px] mb-1 capitalize">2 bedroom properties for sale in Abu Dhabi</li>
            </ul>
          </div>
          <ProjectBanners property={property} />
        </div>
        
      </Container>
        <Container className="grid lg:grid-cols-12 sm:grid-cols-9">
        <div className="col-span-9">
          <ProjectSectionCarousel
            city={city}
            label="TOP_PROJECTS"
            title={
              <>
                Top Projects in{" "}
                <TextHighlight>{property.city.name}</TextHighlight>
              </>
            }
            flatCard
          />
          <FAQSection  title = 'Bloom Living FAQs' />
        </div>
        </Container>
    </main>
  );
};
export default Property;
