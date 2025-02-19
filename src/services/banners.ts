import { fetchWithErrorHandling } from '@/lib/fetchErrorHandling';
import { Banner } from '@/types/Banner';
import { Positions } from '@/types/Shared';

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

export const getBannerByPosition = async (
  position: Positions,
  propertyId?: number
) => {
  const res = await fetchWithErrorHandling<Banner[]>(
    `${API_URL}/banners/${position}?property_id=${propertyId}`,
    {
      cache: 'no-cache',
    }
  );
  return res;
};
