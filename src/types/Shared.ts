export type ImageModel = {
  original: string
  preview: string
  thumb: string
} | null

export type ItemModel = {
  id: number
  name: string
}

export type MediaModel = {
  mime_type: string
  is_cover: boolean
  category: {
    id: number
    name: string
  }
  url: ImageModel
}

export type MediaManagerModel = {
  file_name: string
  mime_type: string
  size: string
  extension: null | string
  id: number
  custom_properties: null
  created_at: string
  url: {
    original: string
    preview: string
    thumb: string
  }
}

export type OperationType = "SALE" | "RENT"

export type PaginateParams = {
  page?: number
  per_page?: number
}

export interface DefaultPaginate<T> {
  items: T[]
  total: number
  page: number
  size: number
  pages: number
}

export interface LandmarkModel {
  id: number
  name: string
  category: {
    id: number
    name: string
    slug: string
    lookup_item_code: string | null
    type_id: number
    parent_item_id: number | null
  }
  address: string | null
  location: {
    lat?: number
    lng?: number
  }
  website: string | null
  youtube_link: string | null
}
