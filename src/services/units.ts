import { fetchWithErrorHandling } from '@/lib/fetchErrorHandling';
import {
  CityIds,
  DefaultPaginate,
  OperationType,
  PaginateParams,
  PropertyRequestModel,
} from '@/types/Shared';
import { BaseUnitModel, ListingAgent, UnitModel } from '@/types/Unit';
import queryString from 'query-string';

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
const UNITS_URL = `${API_URL}/units`;

type GetUnitsParams = {
  label?:
    | 'HOT_DEALS'
    | 'HIGHER_ROI'
    | 'MOST_LIKED'
    | 'NEARBY'
    | 'FEATURED'
    | null;
  community_id?: string | null;
  property_id?: string | null;
  latitude?: string | null;
  longitude?: string | null;
};
export const getUnits = async (
  operationType: 'SALE' | 'RENT',
  city: CityIds,
  params: GetUnitsParams = {}
): Promise<BaseUnitModel[]> => {
  const query = queryString.stringify(params, { skipNull: true });
  const res = await fetch(
    `${UNITS_URL}/FetchUnitsList/${operationType}/${city}?${query}`,
    {
      cache: 'no-cache',
    }
  );

  return res.json();
};

export const getUnit = async (operationType: OperationType, unitId: string) => {
  const res = fetchWithErrorHandling<UnitModel>(
    `${UNITS_URL}/getUnitDetails/${operationType}/${unitId}`,
    {
      cache: 'no-cache',
    }
  );
  return res;
};

type SearchUnitsParams = PaginateParams & {
  city?: string | null;
  operation_type: 'SALE' | 'RENT';
  unit_type?: string | null;
  property_id?: number | null;
  community_id?: number | null;
  price_from?: number | null;
  price_to?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  amenities?: number | null;
  furnishing?: number | null;
  unit_size_from?: number | null;
  unit_size_to?: number | null;
  completion?: 'OFFPLAN' | 'READY' | null;
  sort_by?: 'NEWEST' | 'FEATURED' | 'PRICE_LOW' | 'PRICE_HIGH' | null;
};
export const searchUnits = async (
  params: SearchUnitsParams
): Promise<DefaultPaginate<UnitModel>> => {
  const query = queryString.stringify(params, { skipNull: true });
  const res = await fetch(`${UNITS_URL}/search?${query}`, {
    cache: 'no-cache',
  });

  return res.json();
};

export const getListingAgents = async (
  unitId: string,
  operation: OperationType
): Promise<ListingAgent> => {
  const query = queryString.stringify(
    { operation_type: operation },
    { skipNull: true }
  );
  const res = await fetchWithErrorHandling<ListingAgent>(
    `${UNITS_URL}/getListingAgents/${unitId}?${query}`,
    {
      cache: 'no-cache',
    }
  );
  return res;
};

export const propertyListRequest = async (params: PropertyRequestModel) => {
  const res = await fetchWithErrorHandling(`${API_URL}/propertyListRequest`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
};
