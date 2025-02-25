import { fetchWithErrorHandling } from '@/lib/fetchErrorHandling';
import { DefaultPaginate, Locations } from '@/types/Shared';
import queryString from 'query-string';

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

const LOCATIONS_URL = `${API_URL}/locations`;

export const getLocations = async (paramsQuery: {
  type_id: number;
  page: number;
  per_page: number;
  parent_id?: number;
  name?: string;
  unit_types?: string;
}) => {
  paramsQuery.parent_id ??= 26642;
  const query = queryString.stringify(paramsQuery, { skipNull: true });
  const res = await fetchWithErrorHandling<DefaultPaginate<Locations>>(
    `${LOCATIONS_URL}?${query}`,
    {
      cache: 'no-cache',
    }
  );
  return res;
};
