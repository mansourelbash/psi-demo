import {
  ProjectSummaryModel,
  PropertyListModel,
  PropertyModel,
} from "@/types/Property"
import { DefaultPaginate, LandmarkModel, PaginateParams } from "@/types/Shared"
import { UnitModelModel } from "@/types/Unit"
import queryString from "query-string"

const PROPERTY_URL = `${process.env.API_URL}/properties`

export const getProperty = async (id: string): Promise<PropertyModel> => {
  const res = await fetch(`${PROPERTY_URL}/getPropertyById/${id}`, {
    cache: "no-store",
  })
  return res.json()
}

export const getPropertySummary = async (
  id: string
): Promise<ProjectSummaryModel> => {
  const res = await fetch(`${PROPERTY_URL}/getProjectSummary/${id}`, {
    cache: "no-store",
  })
  return res.json()
}

type GetPropertiesParams = PaginateParams & {
  city_id: number
  community_id?: number
}
export const getProperties = async (
  params: GetPropertiesParams
): Promise<DefaultPaginate<PropertyListModel>> => {
  const query = queryString.stringify(params, { skipNull: true })
  const res = await fetch(`${PROPERTY_URL}?${query}`, {
    cache: "no-cache",
  })
  return res.json()
}

export const getLandmarks = async (
  propertyId: string
): Promise<LandmarkModel[]> => {
  const res = await fetch(`${PROPERTY_URL}/landmarks/${propertyId}`, {
    cache: "no-cache",
  })
  return res.json()
}

export const getPropertyUnitModels = async (
  propertyId: string
): Promise<UnitModelModel[]> => {
  const res = await fetch(`${PROPERTY_URL}/propertyUnitModels/${propertyId}`, {
    cache: "no-cache",
  })
  return res.json()
}

type GetPropertiesByLabelParams = PaginateParams & {
  label?: "FEATURED" | "BEST_FOR_SCHOOLS" | "TOP_PROJECTS" | "RESIDENTIAL"
  developer_id?: string | null
}
export const getPropertiesByLabel = async (
  city: "ABU_DHABI" | "DUBAI",
  params: GetPropertiesByLabelParams
): Promise<PropertyListModel[]> => {
  const query = queryString.stringify(params, { skipNull: true })
  const res = await fetch(
    `${PROPERTY_URL}/FetchPropertiesList/${city}?${query}`,
    {
      cache: "no-cache",
    }
  )
  return res.json()
}
