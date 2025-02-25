import { fetchWithErrorHandling } from '@/lib/fetchErrorHandling';
import { LookupModel, LookupTypes } from '@/types/Lookup';
import { DefaultPaginate } from '@/types/Shared';
import queryString from 'query-string';
const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
const LOOKUPS_URL = `${API_URL}/lookupItems`;

export const getLookups = async (lookupType: LookupTypes) => {
  const query = queryString.stringify(
    { lookup_type: lookupType },
    { skipNull: true }
  );
  const res = await fetchWithErrorHandling<DefaultPaginate<LookupModel>>(
    `${LOOKUPS_URL}?${query}`,
    {
      cache: 'no-cache',
    }
  );
  return res;
};
