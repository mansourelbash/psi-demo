export type ImageModel = {
  original: string;
  preview: string;
  thumb: string;
} | null;

export type ItemModel = {
  id: number;
  name: string;
};

export type MediaModel = {
  mime_type: string;
  is_cover: boolean;
  category: {
    id: number;
    name: string;
  };
  url: ImageModel;
};

export type MediaManagerModel = {
  file_name: string;
  mime_type: string;
  size: string;
  extension: null | string;
  id: number;
  custom_properties: null;
  created_at: string;
  url: {
    original: string;
    preview: string;
    thumb: string;
  };
};

export type OperationType = 'SALE' | 'RENT';

export type PaginateParams = {
  page?: number;
  per_page?: number;
};

export interface DefaultPaginate<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface LandmarkModel {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
    slug: string;
    lookup_item_code: string | null;
    type_id: number;
    parent_item_id: number | null;
  };
  address: string | null;
  location: {
    lat?: number;
    lng?: number;
  };
  website: string | null;
  youtube_link: string | null;
}

export enum CityIds {
  ABU_DHABI = 26792,
  AJMAN = 26658,
  AL_AIN = 26827,
  DUBAI = 26786,
  FUJAIRAH = 26659,
  RAS_AL_KHAIMAH = 58467,
  SHARJAH = 26953,
  UMM_AL_QUWAIN = 64208,
}

export interface ComponentWithCity {
  city: keyof typeof CityIds;
}

export interface ExternalMediaModel {
  file_name: 'string';
  tmp_name: 'string';
  category_id?: number;
}
export type UnitRequestModel = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  lead_class_id: number;
  unit_type_id: number;
  property_id: number;
  bedrooms: number;
  bathrooms: number;
};
