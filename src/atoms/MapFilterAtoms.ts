import { MapSearchItems } from "@/types/mapSearch";
import { BasePropertyModel } from "@/types/Property";
import { atom } from "jotai";

export interface Filters {
    searchType?: "unit" | "project" | "",
    completionStatus: "ANY" | "OFFPLAN" | "READY";
    propertyUsage: "COMMERCIAL" | "RESIDENTIAL" | null;
    cityId: string | undefined;
    propertyType: string[];
    developer: string;
    operationType: "SALE" | "RENT" | "ANY",
    priceRange: [number, number];
    propertySize: [number, number];
    petsAllowed: string;
    selectedCity: string;
    squareFeet: { min: string; max: string };
    selectedUnitRate: string[];
    selectedCompletion: string;
    selectedFurnishing: string[];
    selectedFloorHeight: string;
    selectedAmenities: string[];
    selectedPopular: string[];
    selectedInProperty: string[];
    selectedBuildingCommunity: string[];
    selectedUnitFeatures: string[];
    outdoorSelection: string[];
    otherSelection: string[];
    selectedPrimary: string[];
    handoverFrom: Date | null | string | undefined;
    handoverTo: Date | null | string | undefined;
    unitRefNumber: string
    plotSizeFrom: number | undefined,
    plotSizeTo: number | undefined,
    isPrimarySelected: boolean,
    numberOfFloors: string,
    locationFeatures: number,
    bedrooms: string | null,
    bathrooms: string | null,
    developerName: string,
    villaLocation: string,
    officeType: string
    locationName: string | undefined,
    sortBy?: string
    pageNumber?: number,
    pageSize?: number


}


export const filtersAtom = atom<Filters>({
    completionStatus: "ANY",
    operationType: "SALE",
    propertyUsage: "RESIDENTIAL",
    cityId: "",
    propertyType: [],
    developer: "",
    priceRange: [0, 0],
    propertySize: [0, 0],
    petsAllowed: "",
    selectedCity: "",
    squareFeet: { min: "", max: "" },
    selectedUnitRate: [],
    selectedCompletion: "",
    selectedFurnishing: [],
    selectedFloorHeight: "",
    selectedAmenities: [],
    selectedPopular: [],
    selectedInProperty: [],
    selectedBuildingCommunity: [],
    selectedUnitFeatures: [],
    outdoorSelection: [],
    otherSelection: [],
    selectedPrimary: [],
    handoverFrom: "",
    handoverTo: "",
    unitRefNumber: "",
    developerName: "",
    plotSizeFrom: 0,
    plotSizeTo: 0,
    isPrimarySelected: false,
    numberOfFloors: "",
    locationFeatures: 0,
    bedrooms: "",
    bathrooms: "",
    villaLocation: "",
    officeType: "",
    locationName:"",

});

export const mainFiltersAtom = atom<Filters>({
    searchType: "unit",
    completionStatus: "ANY",
    operationType: "SALE",
    propertyUsage: "RESIDENTIAL",
    cityId: "",
    propertyType: [],
    developer: "",
    priceRange: [0, 0],
    propertySize: [0, 0],
    petsAllowed: "",
    selectedCity: "",
    squareFeet: { min: "", max: "" },
    selectedUnitRate: [],
    selectedCompletion: "",
    selectedFurnishing: [],
    selectedFloorHeight: "",
    selectedAmenities: [],
    selectedPopular: [],
    selectedInProperty: [],
    selectedBuildingCommunity: [],
    selectedUnitFeatures: [],
    outdoorSelection: [],
    otherSelection: [],
    selectedPrimary: [],
    handoverFrom: "",
    handoverTo: "",
    unitRefNumber: "",
    developerName: "",
    plotSizeFrom: 0,
    plotSizeTo: 0,
    isPrimarySelected: false,
    numberOfFloors: "",
    locationFeatures: 0,
    bedrooms: "",
    bathrooms: "",
    villaLocation: "",
    officeType: "",
    locationName:"",
    sortBy:"",
    pageNumber: 1,
    pageSize: 16,
});


export const paginationAtom = atom(
    (get) => {
      const filters = get(mainFiltersAtom);
      return {
        currentPage: filters.pageNumber,
        pageSize: filters.pageSize
      };
    },
    (get, set, update: { pageNumber?: number; pageSize?: number }) => {
      const filters = get(mainFiltersAtom);
      set(mainFiltersAtom, {
        ...filters,
        pageNumber: update.pageNumber ?? filters.pageNumber,
        pageSize: update.pageSize ?? filters.pageSize
      });
    }
  );

  export const apiTotalPagesAtom = atom<number>(0);
  export const currentPageAtom = atom<number>(1);
  export const unitsAtom = atom<MapSearchItems[]>([]);
  export const projectsAtom = atom<BasePropertyModel[]>([]);
