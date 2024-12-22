export type LookupTypes =
  | "language"
  | "property_type"
  | "country"
  | "unitType"
  | "city"
  | "district"
  | "community"
  | "sub_community"
  | "amenity"
  | "facility_or_fixture"
  | "property_image"
  | "unique_selling_point"
  | "unitImage"
  | "landmark_category"
  | "payment_type"
  | "plan_type"
  | "unit_operation_type"
  | "property_ownership"

export type LookupModel = {
  id: number
  lookup_item_code: number | null
  name: string
  parent_item_id: number | null
  slug: string
  type_id: number
}
