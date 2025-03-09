export type CoverPhoto = {
  original: string;
  preview: string;
  thumb: string;
};

export type UnitType = {
  id: number;
  name: string;
};

export type City = {
  id: number;
  name: string;
  slug: string;
};

export type Community = {
  id: number;
  name: string;
  slug: string;
};

export type SubCommunity = {
  id: number;
  name: string;
  slug: string;
};

export type Location = {
  lat: number;
  lng: number;
};

export type MapSearchItems = {
  id: number;
  title?: string;
  property_id?: number;
  property_name?: string;
  is_favorite?: boolean;
  unit_type?: UnitType;
  city?: City;
  community?: Community;
  sub_community?: SubCommunity;
  cover_photo?: CoverPhoto[];
  bedrooms?: number;
  bathrooms?: number;
  built_up_area_sqft?: number;
  furnishing?: number;
  selling_price?: number;
  location?: Location;
  units_count: number;
};
