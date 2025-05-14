import React, { FC, Suspense } from "react";
import LoaderSpinner from "@/components/app/Loader";
import { ToolbarSection } from "../../(Home)/unit/[operation]/[slug]/toolbar-section/ToolbarSection";
import { Container } from "@/components/ui/container";
import {
  getCommunitiesInfo,
  getFAQsForCommunity,
  getLocationsByCommunity,
} from "@/services/locations";
import DestinationShowcase from "@/components/app/communities/CommunitiesGallery";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { NearbyCommunityMap } from "@/components/app/communities/NearbyCommunityMap";
import UnitsSectionCarousel from "@/components/app/UnitsSectionCarousel";
import ProjectSectionCarousel from "@/components/app/ProjectSectionCarousel";
import { CommunityOverviewSection } from "@/components/app/communities/CommunitesOverview";
import { Separator } from "@radix-ui/react-separator";
import FAQSection, {
  FAQ,
} from "@/components/app/project-components/FAQSection";
import CommunitiesInquiryForm from "@/components/app/communities/CommunitiesInquiryForm";
import { CityIds } from "@/types/Shared";
import { formatCityLabel } from "../../(Home)/featured-projects-section/FeaturedProjectsSection";
import CommunityPriceInsight from "@/components/app/communities/CommunityPriceInsight";
import AboutCommunities from "@/components/app/communities/AboutCommunites";

interface PropertyPageModel {
  params: Promise<{
    id: number;
    city: keyof typeof CityIds;
  }>;
}
const page: FC<PropertyPageModel> = async ({ params }) => {
  const { id, city } = await params;
  const communities = await getLocationsByCommunity(id);
  const communitiesLookup = communities.lookup_item_id;
  const crmLocationId = communities.crm_location_id;
  const communitiyInfo = await getCommunitiesInfo(communitiesLookup);
  let communityFaqs: FAQ[] = [];
  try {
    const faqsResponse = await getFAQsForCommunity(crmLocationId);
    if (faqsResponse?.FAQs) {
      communityFaqs = Array.isArray(faqsResponse.FAQs) ? faqsResponse.FAQs : [];
    }
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    communityFaqs = [];
  }

  const breadcrumbData = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: formatCityLabel(`${city}`),
      href: `/communities/?city=${communities.city[0].id}`,
    },
    {
      name: "Communities",
      href: "/communities",
    },
    {
      name: communities.name,
      href: `/communities?city=${communities.city[0].id}&community=${
        communities.city[0].id ?? ""
      }&project=${communities.id}`,
    },
  ];

  return (
    <Suspense
      fallback={
        <div className="relative inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <LoaderSpinner />
        </div>
      }
    >
      <main className="py-[70px]">
        <ToolbarSection breadcrumbData={breadcrumbData} />
        <Container className="mt-[20px] grid grid-cols-12 gap-6 justify-center">
          <div className="col-span-12 flex flex-col gap-8 ">
            <DestinationShowcase media={communitiyInfo.media} city={city} />
            <div className="container mx-auto px-0 py-8">
              <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-12 gap-8">
                <div className="col-span-1 md:col-span-1 xl:col-span-9">
                  <h1 className="text-3xl font-bold text-gray-700 mb-2">
                    {communities.name}
                  </h1>

                  <div className="flex items-center text-gray-600 mb-6">
                    <MapPin className="h-5 w-5 mr-2" />
                    <p>
                      {communities.name} | {communities.city[0].name}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-8">
                    <div className="bg-[#F9F9F9] flex gap-2 items-center px-4 py-2 rounded-full p-2 border border-[#ECECEC]">
                      <Check
                        className="bg-[#60C54F] text-white rounded-full p-1"
                        size={24}
                        weight="bold"
                      />
                      <span className="text-sm">Best Attractions</span>
                    </div>
                    <div className="bg-[#F9F9F9] flex gap-2  items-center px-4 py-2 rounded-full p-2 border border-[#ECECEC]">
                      <Check
                        className="bg-[#60C54F] text-white rounded-full p-1"
                        size={24}
                        weight="bold"
                      />

                      <span className="text-sm">Best Hotels</span>
                    </div>
                    <div className="bg-[#F9F9F9] flex gap-2  items-center px-4 py-2 rounded-full p-2 border border-[#ECECEC]">
                      <Check
                        className="bg-[#60C54F] text-white rounded-full p-1 font-bold"
                        size={24}
                        weight="bold"
                      />
                      <span className="text-sm">Family Friendly</span>
                    </div>
                  </div>

                  {communitiyInfo.description && (
                    <>
                      <Separator className=" w-full bg-[#ECECEC] h-[1px] my-10" />

                      <section className="mb-10">
                        <AboutCommunities name={communities.name} description={communitiyInfo.description} />
                      </section>
                    </>
                  )}

                  <Separator className=" w-full bg-[#ECECEC] h-[1px] my-5" />

                  <CommunityOverviewSection
                    unit_types={communitiyInfo.unit_types}
                    community_name={communities.name}
                  />
                  <Separator className=" w-full bg-[#ECECEC] h-[1px] my-10" />

                  <section>
                    <CommunityPriceInsight communityName={communities.name} />

                    <p className="text-[#D80027] border-l-4 border-[#D80027] text-sm mt-2 bg-[#F9F9F9] p-3">
                      The Price is the Standard one according to PSI MPI.
                    </p>
                  </section>
                  <Separator className=" w-full bg-[#ECECEC] h-[1px] my-10" />

                  <NearbyCommunityMap communities={communities} />
                  <div className="col-span-12 flex flex-col gap-16 mt-[70px]">
                    <UnitsSectionCarousel
                      community_id={communitiesLookup}
                      operation="SALE"
                      city={city}
                      label="HOT_DEALS"
                      showSeeMore={true}
                      title={
                        <>
                          <span className="text-[#E0592A] font-medium">
                            {" "}
                            Hot Deals
                          </span>{" "}
                          in {communities.name}{" "}
                        </>
                      }
                    />
                    <ProjectSectionCarousel
                      city={city}
                      community_id={communitiesLookup}
                      showSeeMore={true}
                      title={
                        <>
                          <span className="text-[#E0592A] font-medium">
                            Projects
                          </span>{" "}
                          In {communities.name}
                        </>
                      }
                      flatCard
                    />
                    {communityFaqs.length > 1 && (
                      <FAQSection
                        title={`${communities.name} FAQs`}
                        faqs={communityFaqs}
                      />
                    )}
                  </div>
                </div>

                <div className="block md:hidden lg:block xl:col-span-3">
                  <div className=" col-span-12 xl:col-span-3 flex flex-wrap gap-6 lg:flex-col justify-center lg:justify-start">
                    <CommunitiesInquiryForm />
                    <div className="border border-gray px-4 rounded-md">
                      <h2 className="mb-3 text-[22px] mt-4">Useful Links : </h2>
                      <ul className="list-disc px-3">
                        <li className="text-[13px] mb-1 capitalize">
                          property for sale in Abu Dhabi
                        </li>
                        <li className="text-[13px] mb-1 capitalize">
                          freehold property for sale in Abu Dhabi
                        </li>
                        <li className="text-[13px] mb-1 capitalize">
                          property for sale in Abu Dhabi for ex-pats
                        </li>
                        <li className="text-[13px] mb-1 capitalize">
                          property for sale in Abu Dhabi UAE
                        </li>
                        <li className="text-[13px] mb-1 capitalize">
                          property for sale in Al Reef Abu Dhabi
                        </li>
                        <li className="text-[13px] mb-1 capitalize">
                          1 bedroom properties for sale in Abu Dhabi
                        </li>
                        <li className="text-[13px] mb-1 capitalize">
                          property for sale in Abu Dhabi
                        </li>
                        <li className="text-[13px] mb-1 capitalize">
                          2 bedroom properties for sale in Abu Dhabi
                        </li>
                      </ul>
                    </div>
                    <div className="relative mt-[20px] rounded-[15px] overflow-hidden hidden lg:flex md:flex xl:flex mb-5 h-[718px]">
                      <Image
                        src="/images/book-now.jpg"
                        alt="Yas Riva Property"
                        width={800}
                        height={720}
                        className="w-full"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </Suspense>
  );
};

export default page;
