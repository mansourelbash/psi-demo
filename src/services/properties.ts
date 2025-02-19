import { fetchWithErrorHandling } from '@/lib/fetchErrorHandling';
import {
  Developer,
  ProjectLabel,
  ProjectSummaryModel,
  PropertyListModel,
  PropertyModel,
} from '@/types/Property';
import {
  CityIds,
  DefaultPaginate,
  LandmarkModel,
  PaginateParams,
  PaymentPlan,
  UnitRequestModel,
} from '@/types/Shared';
import { UnitModelModel } from '@/types/Unit';
import queryString from 'query-string';

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

const PROPERTY_URL = `${API_URL}/properties`;

export const getProperty = async (id: string): Promise<PropertyModel> => {
  const res = await fetch(`${PROPERTY_URL}/getPropertyById/${id}`, {
    cache: 'no-store',
  });
  return res.json();
};

export const getPropertySummary = async (
  id: string
): Promise<ProjectSummaryModel> => {
  const res = await fetch(`${PROPERTY_URL}/getProjectSummary/${id}`, {
    cache: 'no-store',
  });
  return res.json();
};

type GetPropertiesParams = PaginateParams & {
  city_id: number;
  community_id?: number;
};
export const getProperties = async (
  params: GetPropertiesParams
): Promise<DefaultPaginate<PropertyListModel>> => {
  const query = queryString.stringify(params, { skipNull: true });
  const res = await fetch(`${PROPERTY_URL}?${query}`, {
    cache: 'no-cache',
  });
  return res.json();
};

export const getLandmarks = async (
  propertyId: string
): Promise<LandmarkModel[]> => {
  const res = await fetch(`${PROPERTY_URL}/landmarks/${propertyId}`, {
    cache: 'no-cache',
  });
  return res.json();
};

export const getPropertyUnitModels = async (
  propertyId: string
): Promise<UnitModelModel[]> => {
  const res = await fetch(`${PROPERTY_URL}/propertyUnitModels/${propertyId}`, {
    cache: 'no-cache',
  });
  return res.json();
};

type GetPropertiesByLabelParams = PaginateParams & {
  label?: ProjectLabel;
  developer_id?: string | null;
};
export const getPropertiesByLabel = async (
  cityId: CityIds,
  params: GetPropertiesByLabelParams
): Promise<DefaultPaginate<PropertyListModel>> => {
  const query = queryString.stringify(params, { skipNull: true });
  const res = await fetch(
    `${PROPERTY_URL}/FetchPropertiesList/${cityId}?${query}`,
    {
      cache: 'no-cache',
    }
  );
return res.json();
};

export const propertyListRequest = async (params: UnitRequestModel) => {
  const res = await fetchWithErrorHandling(`${PROPERTY_URL}/viewInquiry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
    cache: 'no-cache',
  });
  return res};

  export const getPropertyPaymentPlans = async (id: number) => {
    const res = await fetchWithErrorHandling<PaymentPlan[]>(
      `${PROPERTY_URL}/paymentPlans/${id}`,
      {
        cache: 'no-cache',
      }
    );
    return res;
  };
  
  export const getDeveloperByProperty = async (id: number) => {
    const res = await fetchWithErrorHandling<Developer>(
      `${API_URL}/developers/getDeveloperByProperty/${id}`,
      {
        cache: 'no-cache',
      }
    );
    return res;
  };
  