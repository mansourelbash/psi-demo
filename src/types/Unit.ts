import { LookupModel } from './Lookup';
import { ImageModel, ItemModel, MediaModel } from './Shared';

export type BaseUnitModel = {
  id: number;
  title: string;
  property_id: number;
  property_name: string;
  is_favorite: false;
  unit_type: ItemModel | null;
  city: ItemModel;
  community: ItemModel | null;
  sub_community: ItemModel;
  handover_date: string | null;
  cover_photo: ImageModel[];
  bedrooms: number;
  bathrooms: number;
  sale_roi: number | null;
  rent_roi: number | null;
  total_area_sqft: number | null;
  selling_price: number;
  rent_per_year: number;
  operation_type: ItemModel | null;
  built_up_area_sqft?: number;
  listing_agent?: {
    name: string;
    profile_image: ImageModel;
  };
};

export type UnitModel = BaseUnitModel & {
  location: {
    lat?: number;
    lng?: number;
  };
  media: MediaModel[] | null;
  description: string;
  fixtures: ItemModel[] | null;
  amenities: ItemModel[] | null;
  views: ItemModel | null;
  rent_per_month: number | null;
  rent_per_sqft: number | null;
  price_per_sqft: number | null;
  ownership: ItemModel | null;
  parking:
    | {
        id: number;
        unit_id: number;
        parking_number: string;
        number_of_spaces: number;
        is_paid: boolean;
        annual_charge: number;
        parking_type: {
          id: number;
          name: string;
        };
      }[]
    | null;
};

export type UnitModelModel = {
  id: number;
  property_id: number;
  name: string;
  backyard_no: number;
  bathroom_no: number;
  bedroom_no: number;
  laundry_room_no: number;
  maid_room_no: number;
  parking_no: number;
  service_charge: number;
  store_room_no: number;
  study_room_no: number;
  utility_room_no: number;
  unit_type: LookupModel;
  rent_per_year_from: number;
  rent_per_year_to: number;
  selling_price_from: number;
  selling_price_to: number;
  property_name: string;
  units_bed_no: number;
  units_rent_no: number;
  units_sale_no: number;
  area: number;
  primary_view: LookupModel[] | null;
  secondary_view: LookupModel[] | null;
  media: ImageModel[] | null;
  city_id?: string | number;
  location: {
    lat: number;
    lng: number;
  }
  units_count: number;
};

export enum OperationType {
  Rent = 431,
  Sale = 430,
}

export interface ListingAgent {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  title: {
    id: number;
    name: string;
    slug: string;
    type_id: number;
  };
  languages: {
    id: number;
    name: string;
    slug: string;
    type_id: number;
  }[];
  profile_image: ImageModel;
}
