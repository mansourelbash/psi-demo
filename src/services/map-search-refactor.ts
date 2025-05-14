import { BasePropertyModel } from "@/types/Property";
import { DefaultPaginate } from "@/types/Shared";
import { UnitModelModel } from "@/types/Unit";
import {
  floorHeight,
  furnishingValues,
  Locations,
  officeTypeData,
  propertyMapping,
  propertyTypesItems,
  propertyViewIds,
  unitRateMapping,
  villaLocationData,
} from "@/data";
export interface SearchBaseParams {
  completionStatus?: string;
  selectedCompletion?: string;
  cityId?: string;
  propertyUsage?: string | null;
  propertyType?: string[];
  priceRange?: [string | number | null, string | number | null];
  propertySize?: [string | number | null, string | number | null];
  selectedUnitRate?: string[];
  petsAllowed?: string;
  selectedInProperty?: string[];
  selectedPopular?: string[];
  selectedAmenities?: string[];
  outdoorSelection?: string[];
  otherSelection?: string[];
  selectedFurnishing?: string[];
  selectedBuildingCommunity?: string[];
  selectedFloorHeight?: string;
  selectedUnitFeatures?: string[];
  operationType?: string;
  selectedCity?: string;
  handoverFrom?: string | Date | null | undefined;
  handoverTo?: string | Date | null | undefined;
  unitRefNumber?: string;
  plotSizeFrom?: number | undefined | null;
  plotSizeTo?: number | undefined | null;
  selectedPrimary?: string[];
  isPrimarySelected?: boolean;
  numberOfFloors?: string;
  bedrooms?: string | null;
  bathrooms?: string | null;
  villaLocation?: string;
  officeType?: string;
  sortBy?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface UnitSearchParams extends SearchBaseParams {
  mapView?: boolean;
  developerName?: string;
  locationFeatures?: number;
}

export interface ProjectSearchParams extends SearchBaseParams {
  locationFeatures?: number;
  mapView?: boolean;
}

const DEFAULT_OPERATION_TYPE = "SALE";
const DEFAULT_BOOLEAN_FLAGS = {
  hot_deal: "false",
  higher_roi: "false",
  most_liked: "false",
  featured: "false",
  ready_to_move: "false",
  luxury: "false",
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const addCompletionStatus = (
  params: URLSearchParams,
  completionStatus?: string,
  paramName = "completion"
) => {
  if (completionStatus && ["READY", "OFFPLAN"].includes(completionStatus)) {
    params.set(paramName, completionStatus);
  }
};

const addRangeParam = (
  params: URLSearchParams,
  prefix: string,
  range?: [string | number | null, string | number | null]
) => {
  if (
    range &&
    range.length === 2 &&
    range[0] != null &&
    range[1] != null &&
    Number(range[1]) > 0
  ) {
    params.set(`${prefix}_from`, String(range[0]));
    params.set(`${prefix}_to`, String(range[1]));
  }
};

const addDateParam = (
  params: URLSearchParams,
  key: string,
  date?: string | Date | null
) => {
  if (!date) return;

  const dateObj = new Date(date);
  if (!isNaN(dateObj.getTime())) {
    params.set(key, dateObj.toISOString().split("T")[0]);
  } else {
    console.error(`Invalid ${key} date format.`);
  }
};

const addArrayParam = <T>(
  params: URLSearchParams,
  key: string,
  items?: T[],
  mapper?: (item: T) => string | null
) => {
  if (!items || items.length === 0) return;

  const values = mapper
    ? items.map(mapper).filter((v): v is string => v !== null)
    : items.map(String);

  if (values.length > 0) {
    params.set(key, values.join(","));
  }
};

const addMappedArrayParam = (
  params: URLSearchParams,
  key: string,
  items?: string[],
  mapping: Record<string, number> = {}
) => {
  addArrayParam(params, key, items, (item) =>
    mapping[item] !== undefined ? String(mapping[item]) : null
  );
};


const addPrimaryViews = (
  params: URLSearchParams,
  selectedPrimary?: string[] | string,
  isPrimarySelected?: boolean,
  viewIdsMapping: Record<string, number> = {}
) => {
  if (!selectedPrimary) return;

  const paramName = isPrimarySelected ? "primary_views" : "secondary_views";
  const items = Array.isArray(selectedPrimary)
    ? selectedPrimary
    : [selectedPrimary];

  const viewIds = items
    .map((view) => viewIdsMapping[view])
    .filter((viewId) => viewId !== undefined);

  if (viewIds.length > 0) {
    params.set(paramName, viewIds.join(","));
  } 
};

const addPropertyLocationFeatures = (
  params: URLSearchParams,
  propertyType?: string[],
  villaLocation?: string,
  officeType?: string,
  villaLocationData: Record<string, number> = {},
  officeTypeData: Record<string, number> = {}
) => {
  if (propertyType?.includes("Villa") && villaLocation) {
    const locationValue = villaLocationData[villaLocation];
    if (locationValue) {
      params.set("location_features", locationValue.toString());
    }
  }

  if (propertyType?.includes("Office") && officeType) {
    const officeValue = officeTypeData[officeType];
    if (officeValue) {
      params.set("location_features", officeValue.toString());
    }
  }
};

const buildSearchUrl = (
  endpoint: "units" | "properties",
  params: SearchBaseParams,
  options: {
    mapView?: boolean;
    completionParamName?: string;
    cityIdParamName?: string;
  } = {}
) => {
  const url = new URL(`${API_URL}/${endpoint}/search`);
  const searchParams = new URLSearchParams();
  if (endpoint === "units") {
    searchParams.set("map_view", String(options.mapView ?? true));
  }
  searchParams.set(
    "operation_type",
    params?.operationType || DEFAULT_OPERATION_TYPE
  );
  Object.entries(DEFAULT_BOOLEAN_FLAGS).forEach(([key, value]) => {
    searchParams.set(key, value);
  });

  if (params.sortBy) searchParams.set("sort_by", params.sortBy);
  if (params.pageSize) searchParams.set("per_page", String(params.pageSize));
  if (params.pageNumber) searchParams.set("page", String(params.pageNumber));
  if (params.cityId && params.cityId !== "") {
    searchParams.set(options.cityIdParamName || "city_id", params.cityId);
  }
  if (params.bedrooms && params.bedrooms !== "" && params.bedrooms !== "0") {
    searchParams.set("bedrooms", params.bedrooms);
  }
  if (params.bathrooms && params.bathrooms !== "" && params.bathrooms !== "0") {
    searchParams.set("bathrooms", params.bathrooms);
  }
  if (params.unitRefNumber) {
    searchParams.set("unit_ref_no", params.unitRefNumber);
  }
  if (params.numberOfFloors) {
    searchParams.set("number_of_floors", params.numberOfFloors);
  }
  if (params.petsAllowed) {
    searchParams.set("pets_allowed", params.petsAllowed);
  }

  addCompletionStatus(
    searchParams,
    params.completionStatus,
    options.completionParamName
  );

  if (
    params.propertyUsage &&
    ["RESIDENTIAL", "COMMERCIAL"].includes(params.propertyUsage)
  ) {
    searchParams.set("unit_usage", params.propertyUsage);
  }

  addRangeParam(searchParams, "price", params.priceRange);
  addRangeParam(searchParams, "unit_size", params.propertySize);

  if (params.plotSizeFrom && params.plotSizeTo) {
    searchParams.set("plot_size_from", String(params.plotSizeFrom));
    searchParams.set("plot_size_to", String(params.plotSizeTo));
  }

  addDateParam(searchParams, "handover_from", params.handoverFrom);
  addDateParam(searchParams, "handover_to", params.handoverTo);

  if (propertyTypesItems && params.propertyType) {
    addArrayParam(
      searchParams,
      "unit_types",
      params.propertyType,
      (name) =>
        propertyTypesItems?.find((item) => item.name === name)?.id.toString() ??
        null
    );
  }

  if (unitRateMapping && params.selectedUnitRate) {
    params.selectedUnitRate.forEach((rate) => {
      if (unitRateMapping?.[rate]) {
        searchParams.set(unitRateMapping[rate], "true");
      }
    });
  }

  if (propertyViewIds && params.selectedPrimary) {
    addPrimaryViews(
      searchParams,
      params.selectedPrimary,
      params.isPrimarySelected,
      propertyViewIds
    );
  }

  if (furnishingValues && params.selectedFurnishing) {
    addMappedArrayParam(
      searchParams,
      "furnishing",
      params.selectedFurnishing,
      furnishingValues
    );
  }

  if (
    params.selectedInProperty ||
    params.selectedPopular ||
    params.selectedAmenities ||
    params.otherSelection ||
    params.outdoorSelection ||
    params.selectedBuildingCommunity ||
    params.selectedUnitFeatures
  ) {
    const selectedProperties = [
      ...(params.selectedInProperty || []),
      ...(params.selectedPopular || []),
      ...(params.selectedAmenities || []),
      ...(params.otherSelection || []),
      ...(params.outdoorSelection || []),
      ...(params.selectedBuildingCommunity || []),
      ...(params.selectedUnitFeatures || []),
    ]
      .map((item) => propertyMapping?.[item as keyof typeof propertyMapping])
      .filter(Boolean)
      .map(String);

    if (selectedProperties) {
      searchParams.set("amenities", selectedProperties.join(","));
    }
  }

  if (Locations && params.selectedCity) {
    const key = params.selectedCity as keyof typeof Locations;
    const newCity = Locations[key];


    if (newCity !== undefined) {
      searchParams.set("city_id", newCity.toString());
    }
  }

  if (
    floorHeight &&
    params.selectedFloorHeight &&
    params.selectedFloorHeight.toLowerCase() !== "any"
  ) {
    const newFloorHeight =
      floorHeight[params.selectedFloorHeight as keyof typeof floorHeight];
    if (newFloorHeight) {
      searchParams.set("floor_height", newFloorHeight.toString());
    }
  }

  addPropertyLocationFeatures(
    searchParams,
    params.propertyType,
    params.villaLocation,
    params.officeType,
    villaLocationData,
    officeTypeData
  );

  url.search = searchParams.toString();
  return url.toString();
};

export const getFilterationSearchUnits = async <
  T = DefaultPaginate<UnitModelModel>
>(
  params: UnitSearchParams,
  config: {
    propertyViewIds?: Record<string, number>; 
    furnishingValues?: Record<string, number>;
    propertyTypesItems?: Array<{ name: string; id: number | string }>;
    unitRateMapping?: Record<string, number>;
    propertyMapping?: Record<string, number>;
    Locations?: Record<string, string>;
    floorHeight?: Record<string, number>;
    villaLocationData?: Record<string, string>;
    officeTypeData?: Record<string, number>;
  } = {}
): Promise<T> => {
  const url = buildSearchUrl("units", params, {
    mapView: params?.mapView,
    completionParamName: "completion",
    ...config,
  });

  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Search failed: ${res.statusText}`);
  return res.json();
};

export const getFilterationSearchProjects = async <
  T = DefaultPaginate<BasePropertyModel>
>(
  params: ProjectSearchParams,
  config: {
    propertyViewIds?: Record<string, number>;
    furnishingValues?: Record<string, number>;
    propertyTypesItems?: Array<{ name: string; id: string | number }>;
    unitRateMapping?: Record<string, number>;
    propertyMapping?: Record<string, number>; 
    Locations?: Record<string, string>;
    floorHeight?: Record<string, number>;
    villaLocationData?: Record<string, string>;
    officeTypeData?: Record<string, number>;
  } = {}
): Promise<T> => {
  const url = buildSearchUrl("properties", params, {
    completionParamName: "completion_status",
    cityIdParamName: "city_ids",
    ...config,
  });

  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Search failed: ${res.statusText}`);
  return res.json();
};
