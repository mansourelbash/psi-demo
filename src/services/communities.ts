import { fetchWithErrorHandling } from '@/lib/fetchErrorHandling';
import { CityIds } from '@/types/Shared';

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

export const getCommunities = async (city_id: CityIds) => {
  const res = await fetchWithErrorHandling(
    `${API_URL}/lookupItems/communities/${city_id}`,
    {
      cache: 'no-cache',
    }
  );

  return res;
};
