import AreaCard from "@/components/app/AreaCard";
import HeroSearch from "@/components/app/HeroSearch";
import { Container } from "@/components/ui/container";
import { Locale } from "@/i18n.config";
import { getLocations } from "@/services/locations";
import { CityIds } from "@/types/Shared";

import { FC } from "react";
const CommunityTypeId = 19;
import CommunitiesPagination from "@/components/app/communities/CommunitiesPagination";
import CommunitySearch from "@/components/app/communities/CommunitySearch";
import { getLookups } from "@/services/lookup";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatCityLabel } from "../(Home)/featured-projects-section/FeaturedProjectsSection";
type Props = {
  params: Promise<{
    locale: Locale;
    city: keyof typeof CityIds;
  }>;
  searchParams: Promise<{
    page: number;
    page_size: number;
    unit_type?: string;
    name?: string;
  }>;
};
const Communities: FC<Props> = async ({ searchParams, params }) => {
  const { city } = await params;
  const { page, unit_type, name } = await searchParams;
  if (!page) {
    redirect(`?page=1`);
  }
  const communities = await getLocations({
    type_id: CommunityTypeId,
    page: +page,
    per_page: 20,
    unit_types: unit_type,
    parent_id: CityIds[city],
    name,
  });
  const unitTypes = await getLookups("unit_type");
  if (!communities.items) {
    return null;
  }

  return (
    <Container className="flex flex-col gap-8">
      <HeroSearch
        title="Find Your Perfect Home in the UAE"
        backgroundImage="/images/communities-hero-section.jpg"
        searchComponents={<CommunitySearch propertyTypes={unitTypes.items} />}
      />
      <h2>All Communities in {formatCityLabel(city)}   </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-center xl:grid-cols-3 2xl:grid-cols-4 gap-2">
        {communities.items.map((community) => (
          <Link
            key={community.id}
            href={`/communities/${community.id}`}
            className="block"
          >
            <AreaCard
              index={0}
              location={{
                name: community.name,
                title: community.name,
                types: community.unit_types?.map((type) => type.name) ?? [],
                location: undefined,
                city: { name: formatCityLabel(city) },
                image: community.media?.[0]?.preview,
              }}
            />
          </Link>
        ))}
      </div>
      <CommunitiesPagination page={page} total={communities.pages} />
    </Container>
  );
};
export default Communities;
