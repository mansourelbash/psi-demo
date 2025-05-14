import { fetchWithErrorHandling } from '@/lib/fetchErrorHandling';
import { DefaultPaginate, Locations } from '@/types/Shared';
import queryString from 'query-string';

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

const LOCATIONS_URL = `${API_URL}/locations`;
interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface CommunityResponse {
  FAQs?: FAQ[];
}

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

export const getLocationsByCommunity = async (id: number) => {
  const res = await fetch(`${LOCATIONS_URL}/${id}`, {
    cache: 'no-cache',
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }
  
  return res.json();
}

export const getCommunitiesInfo = async (lookup_id: number) => {
  const res = await fetch(`${LOCATIONS_URL}/GetLocationByLookupId/${lookup_id}`, {
    cache: 'no-cache',
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }
  
  return res.json();
}


export const getCommunitiesLandmarks = async (crm_location_id: number) => {
  const res = await fetch(`${LOCATIONS_URL}/landmarks/${crm_location_id}`, {
    cache: 'no-cache',
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }
  
  return res.json();
}


export const getFAQsForCommunity = async (
  crm_location_id: number
): Promise<CommunityResponse> => {
  try {
    const res = await fetch(`https://ai.psi-crm.com/api/Communities/${crm_location_id}`, {
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json',
      }
    });

    const responseText = await res.text();

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (error) {
      if (res.ok) {
        console.warn(
          `Non-JSON response for community ${crm_location_id}:`,
          error instanceof Error ? error.message : String(error),
          responseText
        );
        return { FAQs: [] };
      }
      throw new Error(responseText || `HTTP ${res.status}`);
    }

    if (!res.ok) {
      throw new Error(responseData.message || `HTTP ${res.status}`);
    }

    return responseData;
  } catch (error) {
    if (error instanceof Error && error.message.includes('not found')) {
      return { FAQs: [] };
    }
    throw error;
  }
};