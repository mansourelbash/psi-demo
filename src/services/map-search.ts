"use server";

// import {
//   floorHeight,
//   furnishingValues,
//   Locations,
//   officeTypeData,
//   propertyMapping,
//   propertyTypesItems,
//   propertyViewIds,
//   unitRateMapping,
//   villaLocationData,
// } from "@/data";
import { MapSearchItems } from "@/types/mapSearch";
// import { BasePropertyModel } from "@/types/Property";
// import { DefaultPaginate } from "@/types/Shared";
// import { UnitModelModel } from "@/types/Unit";

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

export const getSearchMapData = async (): Promise<MapSearchItems[]> => {
  const res = await fetch(
    `${API_URL}/units/search?map_view=true&page=1&operation_type=SALE&hot_deal=false&higher_roi=false&most_liked=false&featured=false&ready_to_move=false&luxury=false`,
    { cache: "no-cache" }
  );

  return await res.json();
};

// search for unit
// export const getFilterationSearchData = async <T = DefaultPaginate<UnitModelModel>>({
//   completionStatus,
//   cityId,
//   propertyType,
//   propertyUsage,
//   priceRange,
//   selectedUnitRate,
//   petsAllowed,
//   selectedInProperty,
//   selectedPopular,
//   selectedAmenities,
//   outdoorSelection,
//   otherSelection,
//   selectedBuildingCommunity,
//   selectedCompletion,
//   selectedFloorHeight,
//   operationType,
//   selectedUnitFeatures,
//   selectedCity,
//   propertySize,
//   selectedFurnishing,
//   handoverFrom,
//   handoverTo,
//   unitRefNumber,
//   // developerName,
//   plotSizeFrom,
//   plotSizeTo,
//   selectedPrimary,
//   isPrimarySelected,
//   // locationFeatures,
//   numberOfFloors,
//   bedrooms,
//   bathrooms,
//   villaLocation,
//   officeType,
//   mapView,
//   sortBy,
//   pageNumber,
//   pageSize,
// }: {
//   completionStatus?: string;
//   selectedCompletion?: string;
//   cityId?: string;
//   propertyUsage?: string | null;
//   propertyType?: string[];
//   priceRange?: [string | number | null, string | number | null];
//   propertySize?: [string | number | null, string | number | null];
//   selectedUnitRate?: string[];
//   petsAllowed?: string;
//   selectedInProperty?: string[];
//   selectedPopular?: string[];
//   selectedAmenities?: string[];
//   outdoorSelection?: string[];
//   otherSelection?: string[];
//   selectedFurnishing?: string[];
//   selectedBuildingCommunity?: string[];
//   selectedFloorHeight?: string;
//   selectedUnitFeatures?: string[];
//   operationType?: string;
//   selectedCity?: string;
//   handoverFrom?: string | Date | null | undefined;
//   handoverTo?: string | Date | null | undefined;
//   unitRefNumber?: string;
//   plotSizeFrom?: number | undefined | null;
//   plotSizeTo?: number | undefined | null;
//   selectedPrimary?: string[];
//   isPrimarySelected?: boolean;
//   locationFeatures?: number;
//   numberOfFloors?: string;
//   bedrooms?: string | null ;
//   bathrooms?: string | null ;
//   developerName? : string;
//   villaLocation? : string;
//   officeType?: string
//   mapView?: boolean
//   sortBy?: string,
//   pageNumber?: number,
//   pageSize?: number,
// } = {}): Promise<T> => {
//   const defaultMapView = mapView ?? true;
//   let url = `${API_URL}/units/search?map_view=${defaultMapView}&operation_type=${
//     operationType ? operationType : "SALE"
//   }&hot_deal=false&higher_roi=false&most_liked=false&featured=false&ready_to_move=false&luxury=false`;
//   if (
//     completionStatus &&
//     (completionStatus === "READY" || completionStatus === "OFFPLAN")
//   ) {
//     url += `&completion=${completionStatus}`;
//   }

//   if(sortBy){
//     url += `&sort_by=${sortBy}`;
//   }

//   if (
//     selectedCompletion &&
//     (selectedCompletion === "READY" || selectedCompletion === "OFFPLAN")
//   ) {
//     url += `&completion=${selectedCompletion}`;
//   }

//   if (
//     propertyUsage &&
//     (propertyUsage === "RESIDENTIAL" || propertyUsage === "COMMERCIAL")
//   ) {
//     url += `&unit_usage=${propertyUsage}`;
//   }
//   if (cityId && cityId !== '') {
//     url += `&city_id=${cityId}`;
//   }

//   if (bedrooms && bedrooms !== "" && bedrooms !== '0') {
//     url += `&bedrooms=${bedrooms}`;
//   }
//   if (pageSize) {
//     url += `&per_page=${pageSize}`;
//   }
//   if (pageNumber) {
//     url += `&page=${pageNumber}`;
//   }
//   if (bathrooms && bathrooms !== "" && bathrooms !== '0') {
//     url += `&bathrooms=${bathrooms}`;
//   }  
  
//   if (unitRefNumber) {
//     url += `&unit_ref_no=${unitRefNumber}`;
//   }
//   if(numberOfFloors){
//     url += `&number_of_floors=${numberOfFloors}`;
//   }

//   if (propertyType?.includes("Villa") && villaLocation) {
//     const locationValue = villaLocationData[villaLocation as keyof typeof villaLocationData];
//     if (locationValue) {
//       url += `&location_features=${locationValue}`;
//     }
//   }

//   if (propertyType?.includes("Office") && officeType) {
//     const officeValue = officeTypeData[officeType as keyof typeof officeTypeData];
//     if (officeValue) {
//       url += `&location_features=${officeValue}`;
//     }
//   }

//   if (selectedPrimary) {
//     if (isPrimarySelected) {

//       if (Array.isArray(selectedPrimary)) {
//         const primaryViewIds = selectedPrimary
//           .map(view => propertyViewIds[view as keyof typeof propertyViewIds])
//           .filter(viewId => viewId !== undefined);

//         if (primaryViewIds.length > 0) {
//           // Add to primary views
//           url += `&primary_views=${primaryViewIds.join(',')}`;
//         } else {
//           console.error("One or more selected primary views were not found in propertyViewIds.");
//         }
//       } else {
//         const viewId = propertyViewIds[selectedPrimary];
//         if (viewId !== undefined) {

//           url += `&primary_views=${viewId}`;
//         } else {
//           console.error("Selected primary view not found in propertyViewIds.");
//         }
//       }
//     } else {
//       if (Array.isArray(selectedPrimary)) {
//         const secondaryViewIds = selectedPrimary
//           .map(view => propertyViewIds[view as keyof typeof propertyViewIds])  
//           .filter(viewId => viewId !== undefined); 
  
//         if (secondaryViewIds.length > 0) {
//           // Add to secondary views
//           url += `&secondary_views=${secondaryViewIds.join(',')}`;
//         } else {
//           console.error("One or more selected secondary views were not found in propertyViewIds.");
//         }
//       } else {
//         const viewId = propertyViewIds[selectedPrimary];
//         if (viewId !== undefined) {
//           // Add single secondary view
//           url += `&secondary_views=${viewId}`;
//         } else {
//           console.error("Selected secondary view not found in propertyViewIds.");
//         }
//       }
//     }
//   }
  
  
  

//   if (selectedFurnishing) {
//     const furnishingParam = selectedFurnishing
//       .map(
//         (option: string) =>
//           furnishingValues[option as keyof typeof furnishingValues]
//       )
//       .filter((value) => value !== undefined)
//       .join(",");

//     if (furnishingParam) {
//       url += `&furnishing=${furnishingParam}`;
//     }
//   }
//   if (handoverFrom) {
//     const handoverFromDate = new Date(handoverFrom);
//     if (!isNaN(handoverFromDate.getTime())) {
//       url += `&handover_from=${handoverFromDate.toISOString().split("T")[0]}`;
//     } else {
//       console.error("Invalid handoverFrom date format.");
//     }
//   }
  
//   if (handoverTo) {
//     const handoverToDate = new Date(handoverTo);
//     if (!isNaN(handoverToDate.getTime())) {
//       url += `&handover_to=${handoverToDate.toISOString().split("T")[0]}`;
//     } else {
//       console.error("Invalid handoverTo date format.");
//     }
//   }
//   if (plotSizeFrom && plotSizeTo) {
//     url += `&plot_size_from=${plotSizeFrom}&plot_size_to=${plotSizeTo}`;
//   }
//   if (Array.isArray(propertyType) && propertyType.length > 0) {
//     const selectedIds = propertyType
//       .map((name) => {
//         const property = propertyTypesItems.find((item) => item.name === name);
//         return property ? property.id : null;
//       })
//       .filter((id) => id !== null);

//     if (selectedIds.length > 0) {
//       const unitTypesQuery = selectedIds.join(",");
//       url += `&unit_types=${unitTypesQuery}`;
//     }
//   }

//   if (priceRange && priceRange.length === 2 && priceRange[0] != null && priceRange[1] != null && Number(priceRange[1]) > 0 ) {
//     url += `&price_from=${String(priceRange[0])}&price_to=${String(priceRange[1])}`;
//   }
  

//   if (propertySize && propertySize.length === 2 && Number(propertySize[1]) > 0) {
//     url += `&unit_size_from=${String(propertySize[0])}&unit_size_to=${String(
//       propertySize[1]
//     )}`;
//   }

//   if (selectedUnitRate && selectedUnitRate.length > 0) {
//     selectedUnitRate.forEach((rate) => {
//       if (unitRateMapping[rate]) {
//         const parameter = unitRateMapping[rate];
//         url += `&${parameter}=${true}`;
//       }
//     });
//   }

//   if (
//     selectedInProperty &&
//     selectedPopular &&
//     selectedAmenities &&
//     otherSelection &&
//     outdoorSelection &&
//     selectedBuildingCommunity &&
//     selectedUnitFeatures
//   ) {
//     const selectedProperties = [
//       ...selectedInProperty,
//       ...selectedPopular,
//       ...selectedAmenities,
//       ...otherSelection,
//       ...outdoorSelection,
//       ...selectedBuildingCommunity,
//       ...selectedUnitFeatures,
//     ]
//       .flat()
//       .map(
//         (inProperty) =>
//           propertyMapping[inProperty as keyof typeof propertyMapping]
//       )
//       .filter(Boolean)
//       .join("%");

//     if (selectedProperties) {
//       url += `&amenities=${selectedProperties}`;
//     }
//   }

//   if (selectedCity) {
//     const newCity = Locations[selectedCity as keyof typeof Locations];
//     url += `&city_id=${newCity}`;
//   }

//   if (selectedFloorHeight && selectedFloorHeight.toLowerCase() !== "ANY") {
//     if (floorHeight[selectedFloorHeight as keyof typeof floorHeight]) {
//       const newFloorHeight =
//         floorHeight[selectedFloorHeight as keyof typeof floorHeight];
//       url += `&floor_height=${newFloorHeight}`;
//     }
//   }

//   if (petsAllowed) {
//     url += `&pets_allowed=${petsAllowed}`;
//   }
//   console.log(url,'url')
//   const res = await fetch(url, { cache: "no-cache" });
//   const returnedData = await res.json();
//   return returnedData;
// };

// search for project
// export const getFilterationSearchProjectData = async <T = DefaultPaginate<BasePropertyModel>>({
//   completionStatus,
//   cityId,
//   propertyType,
//   propertyUsage,
//   priceRange,
//   selectedUnitRate,
//   petsAllowed,
//   selectedInProperty,
//   selectedPopular,
//   selectedAmenities,
//   outdoorSelection,
//   otherSelection,
//   selectedBuildingCommunity,
//   selectedCompletion,
//   selectedFloorHeight,
//   operationType,
//   selectedUnitFeatures,
//   selectedCity,
//   propertySize,
//   selectedFurnishing,
//   handoverFrom,
//   handoverTo,
//   unitRefNumber,
//   plotSizeFrom,
//   plotSizeTo,
//   selectedPrimary,
//   isPrimarySelected,
//   numberOfFloors,
//   bedrooms,
//   bathrooms,
//   villaLocation,
//   officeType,
//   sortBy,
//   pageNumber,
//   pageSize,
// }: {
//   completionStatus?: string;
//   selectedCompletion?: string;
//   cityId?: string;
//   propertyUsage?: string | null;
//   propertyType?: string[];
//   priceRange?: [string | number | null, string | number | null];
//   propertySize?: [string | number | null, string | number | null];
//   selectedUnitRate?: string[];
//   petsAllowed?: string;
//   selectedInProperty?: string[];
//   selectedPopular?: string[];
//   selectedAmenities?: string[];
//   outdoorSelection?: string[];
//   otherSelection?: string[];
//   selectedFurnishing?: string[];
//   selectedBuildingCommunity?: string[];
//   selectedFloorHeight?: string;
//   selectedUnitFeatures?: string[];
//   operationType?: string;
//   selectedCity?: string;
//   handoverFrom?: string | Date | null | undefined;
//   handoverTo?: string | Date | null | undefined;
//   unitRefNumber?: string;
//   plotSizeFrom?: number | undefined | null;
//   plotSizeTo?: number | undefined | null;
//   selectedPrimary?: string[];
//   isPrimarySelected?: boolean;
//   locationFeatures?: number;
//   numberOfFloors?: string;
//   bedrooms?: string | null ;
//   bathrooms?: string | null ;
//   developerName? : string;
//   villaLocation? : string;
//   officeType?: string
//   mapView?: boolean
//   sortBy?: string,
//   pageNumber?: number,
//   pageSize?: number,
// } = {}): Promise<T> => {
//   let url = `${API_URL}/properties/search?operation_type=${
//     operationType ? operationType : "SALE"
//   }&hot_deal=false&higher_roi=false&most_liked=false&featured=false&ready_to_move=false&luxury=false`;
//   if (
//     completionStatus &&
//     (completionStatus === "READY" || completionStatus === "OFFPLAN")
//   ) {
//     url += `&completion_status=${completionStatus}`;
//   }

//   if(sortBy){
//     url += `&sort_by=${sortBy}`;
//   }

//   if (
//     selectedCompletion &&
//     (selectedCompletion === "READY" || selectedCompletion === "OFFPLAN")
//   ) {
//     url += `&completion_status=${selectedCompletion}`;
//   }

//   if (
//     propertyUsage &&
//     (propertyUsage === "RESIDENTIAL" || propertyUsage === "COMMERCIAL")
//   ) {
//     url += `&unit_usage=${propertyUsage}`;
//   }
//   if (cityId && cityId !== '') {
//     url += `&city_id=${cityId}`;
//   }

//   if (bedrooms && bedrooms !== "" && bedrooms !== '0') {
//     url += `&bedrooms=${bedrooms}`;
//   }
//   if (pageSize) {
//     url += `&per_page=${pageSize}`;
//   }
//   if (pageNumber) {
//     url += `&page=${pageNumber}`;
//   }
//   if (bathrooms && bathrooms !== "" && bathrooms !== '0') {
//     url += `&bathrooms=${bathrooms}`;
//   }  
  
//   if (unitRefNumber) {
//     url += `&unit_ref_no=${unitRefNumber}`;
//   }
//   if(numberOfFloors){
//     url += `&number_of_floors=${numberOfFloors}`;
//   }

//   if (propertyType?.includes("Villa") && villaLocation) {
//     const locationValue = villaLocationData[villaLocation as keyof typeof villaLocationData];
//     if (locationValue) {
//       url += `&location_features=${locationValue}`;
//     }
//   }

//   if (propertyType?.includes("Office") && officeType) {
//     const officeValue = officeTypeData[officeType as keyof typeof officeTypeData];
//     if (officeValue) {
//       url += `&location_features=${officeValue}`;
//     }
//   }

//   if (selectedPrimary) {
//     if (isPrimarySelected) {

//       if (Array.isArray(selectedPrimary)) {
//         const primaryViewIds = selectedPrimary
//           .map(view => propertyViewIds[view as keyof typeof propertyViewIds])
//           .filter(viewId => viewId !== undefined);

//         if (primaryViewIds.length > 0) {
//           url += `&primary_views=${primaryViewIds.join(',')}`;
//         } else {
//           console.error("One or more selected primary views were not found in propertyViewIds.");
//         }
//       } else {
//         const viewId = propertyViewIds[selectedPrimary];
//         if (viewId !== undefined) {

//           url += `&primary_views=${viewId}`;
//         } else {
//           console.error("Selected primary view not found in propertyViewIds.");
//         }
//       }
//     } else {
//       if (Array.isArray(selectedPrimary)) {
//         const secondaryViewIds = selectedPrimary
//           .map(view => propertyViewIds[view as keyof typeof propertyViewIds])  
//           .filter(viewId => viewId !== undefined); 
  
//         if (secondaryViewIds.length > 0) {
//           url += `&secondary_views=${secondaryViewIds.join(',')}`;
//         } else {
//           console.error("One or more selected secondary views were not found in propertyViewIds.");
//         }
//       } else {
//         const viewId = propertyViewIds[selectedPrimary];
//         if (viewId !== undefined) {
//           url += `&secondary_views=${viewId}`;
//         } else {
//           console.error("Selected secondary view not found in propertyViewIds.");
//         }
//       }
//     }
//   }

//   if (selectedFurnishing) {
//     const furnishingParam = selectedFurnishing
//       .map(
//         (option: string) =>
//           furnishingValues[option as keyof typeof furnishingValues]
//       )
//       .filter((value) => value !== undefined)
//       .join(",");

//     if (furnishingParam) {
//       url += `&furnishing=${furnishingParam}`;
//     }
//   }
//   if (handoverFrom) {
//     const handoverFromDate = new Date(handoverFrom);
//     if (!isNaN(handoverFromDate.getTime())) {
//       url += `&handover_from=${handoverFromDate.toISOString().split("T")[0]}`;
//     } else {
//       console.error("Invalid handoverFrom date format.");
//     }
//   }
  
//   if (handoverTo) {
//     const handoverToDate = new Date(handoverTo);
//     if (!isNaN(handoverToDate.getTime())) {
//       url += `&handover_to=${handoverToDate.toISOString().split("T")[0]}`;
//     } else {
//       console.error("Invalid handoverTo date format.");
//     }
//   }
//   if (plotSizeFrom && plotSizeTo) {
//     url += `&plot_size_from=${plotSizeFrom}&plot_size_to=${plotSizeTo}`;
//   }
//   if (Array.isArray(propertyType) && propertyType.length > 0) {
//     const selectedIds = propertyType
//       .map((name) => {
//         const property = propertyTypesItems.find((item) => item.name === name);
//         return property ? property.id : null;
//       })
//       .filter((id) => id !== null);

//     if (selectedIds.length > 0) {
//       const unitTypesQuery = selectedIds.join(",");
//       url += `&unit_types=${unitTypesQuery}`;
//     }
//   }

//   if (priceRange && priceRange.length === 2 && priceRange[0] != null && priceRange[1] != null && Number(priceRange[1]) > 0 ) {
//     url += `&price_from=${String(priceRange[0])}&price_to=${String(priceRange[1])}`;
//   }
  

//   if (propertySize && propertySize.length === 2 && Number(propertySize[1]) > 0) {
//     url += `&unit_size_from=${String(propertySize[0])}&unit_size_to=${String(
//       propertySize[1]
//     )}`;
//   }

//   if (selectedUnitRate && selectedUnitRate.length > 0) {
//     selectedUnitRate.forEach((rate) => {
//       if (unitRateMapping[rate]) {
//         const parameter = unitRateMapping[rate];
//         url += `&${parameter}=${true}`;
//       }
//     });
//   }

//   if (
//     selectedInProperty &&
//     selectedPopular &&
//     selectedAmenities &&
//     otherSelection &&
//     outdoorSelection &&
//     selectedBuildingCommunity &&
//     selectedUnitFeatures
//   ) {
//     const selectedProperties = [
//       ...selectedInProperty,
//       ...selectedPopular,
//       ...selectedAmenities,
//       ...otherSelection,
//       ...outdoorSelection,
//       ...selectedBuildingCommunity,
//       ...selectedUnitFeatures,
//     ]
//       .flat()
//       .map(
//         (inProperty) =>
//           propertyMapping[inProperty as keyof typeof propertyMapping]
//       )
//       .filter(Boolean)
//       .join("%");

//     if (selectedProperties) {
//       url += `&amenities=${selectedProperties}`;
//     }
//   }

//   if (selectedCity) {
//     const newCity = Locations[selectedCity as keyof typeof Locations];
//     url += `&city_ids=${newCity}`;
//   }

//   if (selectedFloorHeight && selectedFloorHeight.toLowerCase() !== "ANY") {
//     if (floorHeight[selectedFloorHeight as keyof typeof floorHeight]) {
//       const newFloorHeight =
//         floorHeight[selectedFloorHeight as keyof typeof floorHeight];
//       url += `&floor_height=${newFloorHeight}`;
//     }
//   }

//   if (petsAllowed) {
//     url += `&pets_allowed=${petsAllowed}`;
//   }
//   console.log(url,'url')
//   const res = await fetch(url, { cache: "no-cache" });
//   const returnedData = await res.json();
//   return returnedData;
// };

export const getUnitsForPropertyId = async ({
  propertyId,
  operationType,
}: {
  propertyId: number;
  operationType?: string;
}) => {
  const res = await fetch(
    `${API_URL}/units/search?map_view=false&page=1&operation_type=${operationType}&property_id=${propertyId}&hot_deal=false&higher_roi=false&most_liked=false&featured=false&ready_to_move=false&luxury=false`,
    { cache: "no-cache" }
  );

  return await res.json();
};

// export const getProjectsDeveloper = async (
//   id: number,
//   page: number,
//   per_page: number
// ): Promise<ProjectDeveloperModel> => {

//   const res = await fetch(
//     `${DEVELOPER_URL}/projects/${id}?page=${page}&per_page=${per_page}`,
//     { next: { revalidate: 3600 }}
//   );

//   if (!res.ok) {
//     console.error(`API Error: ${res.status} ${res.statusText}`);
//     throw new Error(`API request failed with status ${res.status}`);
//   }
//   return await res.json();
// };
