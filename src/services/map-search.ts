'use server';

import { MapSearchItems } from "@/types/mapSearch";

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

export const getSearchMapData = async (): Promise<MapSearchItems[]> => {
  console.log(API_URL,'API_URL')
  const res = await fetch(
    `${API_URL}/units/search?map_view=true&page=1&operation_type=SALE&hot_deal=false&higher_roi=false&most_liked=false&featured=false&ready_to_move=false&luxury=false`,
    { cache: "no-cache"}
  );
  
  return await res.json();
};

export const getFilterationSearchData = async ({
  completionStatus,
  cityId,
  propertyType,
  priceRange,
}: {
  completionStatus?: string;
  cityId?: string;
  propertyType?: string | number | null;
  priceRange?: [string | number, string | number];
} = {}): Promise<MapSearchItems[]> => {
  console.log(completionStatus, cityId, propertyType, priceRange, 'url url url')
  console.log(API_URL,'API_URL')

  let url = `${API_URL}/units/search?map_view=true&page=1&operation_type=SALE&hot_deal=false&higher_roi=false&most_liked=false&featured=false&ready_to_move=false&luxury=false`;

  if (completionStatus && (completionStatus === "READY" || completionStatus === "OFFPLAN")) {
    url += `&completion=${completionStatus}`;
  }
  if (cityId) {
    url += `&city_id=${cityId}`;
  }
  if (propertyType) {
    url += `&unit_types=${propertyType}`;
  }
  if (priceRange && priceRange.length === 2) {
    url += `&price_from=${String(priceRange[0])}&price_to=${String(priceRange[1])}`;
  }

  const res = await fetch(url, { cache: "no-cache" });
  const returnedData = await res.json();
  return returnedData;
};



export const getUnitsForPropertyId = async ({ propertyId }: { propertyId: number }) => {
  const res = await fetch(
    `${API_URL}/units/search?map_view=false&page=1&operation_type=SALE&property_id=${propertyId}&hot_deal=false&higher_roi=false&most_liked=false&featured=false&ready_to_move=false&luxury=false`,
    { cache: "no-cache" }
  );

  return await res.json();
};


// export const getProjectsDeveloper = async (
//   id: number,
//   page: number,
//   per_page: number
// ): Promise<ProjectDeveloperModel> => {

//   const res = await fetch(
//     `${DEVELOPER_URL}/projects/${id}?page=${page}&per_page=${per_page}`,
//     { next: { revalidate: 3600 }}
//   );

//   if (!res.ok) {
//     console.error(`API Error: ${res.status} ${res.statusText}`);
//     throw new Error(`API request failed with status ${res.status}`);
//   }
//   return await res.json();
// };
