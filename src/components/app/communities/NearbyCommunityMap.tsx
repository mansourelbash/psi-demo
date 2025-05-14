import { AppLandmarksMap } from "@/components/app/AppLandmarksMap";
import { TypographyH2 } from "@/components/ui/typography";
import { getCommunitiesLandmarks } from "@/services/locations";
import { City } from "@/types/mapSearch";

type Community = {
  id: number;
  name: string;
  crm_location_id: number;
  source: string;
  lookup_item_id: number;
  city: City[];
  description: string;
  is_active: boolean;
  is_featured: boolean;
  location: {
    lat: number;
    lng: number;
  };
};

type NearbyCommunityMapProps = {
  communities: Community;
};

export const NearbyCommunityMap = async ({ communities }: NearbyCommunityMapProps) => {
  const communitiyLandmarks = await getCommunitiesLandmarks(communities.crm_location_id);

  return (
    <div className="space-y-7 mt-[54px]">
      <TypographyH2 className="font-medium">
        Location & Nearby
      </TypographyH2>
      <AppLandmarksMap landmarks={communitiyLandmarks} itemLocation={communities.location} />
    </div>
  );
};
