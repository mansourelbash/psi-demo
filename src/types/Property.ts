import { ImageModel, ItemModel, MediaModel } from "./Shared"

export type BasePropertyModel = {
  id: number
  name: string
  min_selling_price: null | number
  max_selling_price: null | number
  min_rent_price_per_year: null | number
  max_rent_price_per_year: null | number
  city: ItemModel
  community: ItemModel
  sub_community: ItemModel
  is_favorite: boolean
  min_bedrooms: null | number
  max_bedrooms: null | number
  min_bathrooms: null | number
  max_bathrooms: null | number
  min_total_sqft: null | number
  max_total_sqft: null | number
  cover_photo: ImageModel
  unit_types?: ItemModel[]
  developer: {
    id: number
    name: string
    email: null | string
    phone: null | string
    website: null | string
    license_number: null | string
    language: string
    overview: null | string
    establish_date: null | string
    logo: ImageModel | null
  } | null
}

export type PropertyModel = Omit<BasePropertyModel, "cover_photo"> & {
  built_up_area_sq_ft: number | null
  number_of_floors: number | null
  address_line_1: string | null
  location: {
    lat?: number
    lng?: number
  }
  service_charge: number | null
  launch_date: string | null
  handover_date: string | null
  property_type: ItemModel
  district: ItemModel
  country: ItemModel | null
  amenities: ItemModel[] | null
  facilities: ItemModel[]
  media: MediaModel[] | null
  usps: ItemModel[]
  ownership: ItemModel | null
  is_luxury: boolean
  overview: string | null
  slug: string
}

export type ProjectSummaryModel = {
  id: number
  name: string
  location: {
    lat?: number
    lng?: number
  }
  launch_date: string | null
  handover_date: string | null
  community_name: string
  expected_roi: number
  service_charge: number
  developer_name: string
  min_bedrooms: number
  max_bedrooms: number
  min_bathrooms: number
  max_bathrooms: number
  min_total_sqft: number | null
  max_total_sqft: number | null
  min_selling_price: number | null
  max_selling_price: number | null
  min_rent_price_per_year: number | null
  max_rent_price_per_year: number | null
  number_of_units: number | null
  is_luxury: boolean
}

export type PropertyListModel = BasePropertyModel & {
  location: {
    lat?: number
    lng?: number
  }
  handover_date: string | null
}

export type PropertyByDeveloperModel = {
  id: number
  name: string
  location: {
    lat?: number
    lng?: number
  }
  cover_photo?: ImageModel
  handover_date?: string
}
