"use client";

import { useState, useEffect, useCallback, RefObject, useRef } from "react";
import { MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import SliderPrice from "@/components/app/map/SliderPrice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, ChevronUp } from "lucide-react";
import AddtionalFilter from "./AddtionalFilter";
import { Map } from "mapbox-gl";
import { useAtom, useSetAtom } from "jotai";
import {
  activePointClickedAtom,
  mapItemsAtom,
  unitsItemAtom,
} from "./MapSearch";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import { filtersAtom } from "@/atoms/MapFilterAtoms";
import { AdvanceIcon } from "@/components/icons/advance-icon";
import BedsPathsFilter from "./BedsPathsFilter";
import PropertyTypeFilter from "./PropertyTypeFilter";
import { MapSearchItems } from "@/types/mapSearch";
import { getFilterationSearchUnits } from "@/services/map-search-refactor";

interface SearchMapProps {
  className?: string;
  mapContainerRef: RefObject<Map | null>;
}

export interface Suggestion {
  title: string;
  subtitle?: string;
  city_id?: string;
  location?: {
    lng: number;
    lat: number;
  };
}

export const debounce = (func: () => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, delay);
  };
};
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SearchMap({
  className = "",
  mapContainerRef,
}: SearchMapProps) {
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const setMapItems = useSetAtom(mapItemsAtom);
  const [, setActivePointClicked] = useAtom(activePointClickedAtom);
  const [filters, setFilters] = useAtom(filtersAtom);
  const [propertyTypeOpen, setPropertyTypeOpen] = useState(false);

  const {
    completionStatus,
    cityId,
    propertyType,
    propertyUsage,
    operationType,
    priceRange,
    selectedUnitRate,
    bedrooms,
    bathrooms,
    petsAllowed,
    selectedInProperty,
    selectedPopular,
    selectedAmenities,
    outdoorSelection,
    otherSelection,
    selectedBuildingCommunity,
    selectedFloorHeight,
    selectedUnitFeatures,
    selectedCity,
    propertySize,
    selectedFurnishing,
    handoverFrom,
    handoverTo,
    unitRefNumber,
    developerName,
    plotSizeFrom,
    plotSizeTo,
    selectedPrimary,
    isPrimarySelected,
    numberOfFloors,
    locationFeatures,
    villaLocation,
    officeType
  } = filters;

  const setUnitItems = useSetAtom(unitsItemAtom);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const isRent = operationType === "RENT";
  const handleCompletionStatusChange = (item: "ANY" | "READY" | "OFFPLAN") => {
    setFilters((prev) => ({
      ...prev,
      completionStatus: item.toUpperCase() as "ANY" | "OFFPLAN" | "READY",
    }));
  };

  const fetchSuggestions = useCallback(
    debounce(async () => {
      if (location.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/properties/listByNameOrCommunityName?keyword=${encodeURIComponent(
            location
          )}&map_view=false`
        );
        const data = await response.json();
        setSuggestions(data || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }, 0),
    [location]
  );

  useEffect(() => {
    fetchSuggestions();
  }, [location, fetchSuggestions]);

  useEffect(() => {
    if (!location && mapContainerRef.current) {
      mapContainerRef.current.flyTo({
        center: [54.3773, 24.4539],
        zoom: 7,
      });
    }
  }, [location]);

  const handleSelect = (item: Suggestion) => {
    if (item?.city_id) {
      setFilters((prev) => ({ ...prev, cityId: item.city_id }));
    } else {
      if (!location) {
        setFilters((prev) => ({ ...prev, cityId: "" }));
      }
    }
    setLocation(item.title);
    (document.activeElement as HTMLElement)?.blur();

    if (mapContainerRef.current && item.location) {
      const { lng, lat } = item?.location;
      if (!isNaN(lng) && !isNaN(lat)) {
        mapContainerRef.current.flyTo({
          center: [lng, lat],
          zoom: 14,
        });
      } else {
        console.error("Invalid coordinates for location:", item?.location);
      }
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target as Node)
    ) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    try {
      setUnitItems([]);
      setActivePointClicked(null);
      if (!location) {
        setFilters((prev) => ({ ...prev, selectedCity: "" }));
      }
      const newData = await getFilterationSearchUnits<MapSearchItems[]>({
        completionStatus,
        cityId,
        propertyType,
        priceRange: [priceRange[0], priceRange[1]],
        selectedUnitRate,
        operationType,
        propertyUsage,
        bedrooms,
        bathrooms,
        petsAllowed,
        selectedInProperty,
        selectedPopular,
        selectedAmenities,
        outdoorSelection,
        otherSelection,
        selectedBuildingCommunity,
        selectedFloorHeight,
        selectedUnitFeatures,
        selectedCity,
        propertySize,
        selectedFurnishing,
        handoverFrom,
        handoverTo,
        unitRefNumber,
        developerName,
        plotSizeFrom,
        plotSizeTo,
        selectedPrimary,
        isPrimarySelected,
        numberOfFloors,
        locationFeatures,
        villaLocation,
        officeType
      });
      setMapItems(newData);

      mapContainerRef?.current?.flyTo({
        center: [54.3773, 24.4539],
        zoom: 7,
      });
    } catch (error) {
      console.error("Error fetching map data:", error);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLocation = e.target.value;
    setLocation(newLocation);


    if (newLocation.trim() === "") {
      setFilters((prev) => ({ ...prev, selectedCity: "", cityId: "" }));
    } else {
      fetchSuggestions();
    }
  };

  return (
    <div className={`w-full  mx-auto bg-white ${className}`}>
      <div id="map-search-section" className="flex flex-col sm:flex-row justify-between items-stretch gap-2 pb-2 w-full">
  <div className="flex w-full sm:w-auto sm:min-w-[250px] rounded-sm overflow-hidden border">
    <Button
      className={`rounded-none h-12 sm:h-[45px] grow ${
        operationType === "SALE" ? "bg-primary text-white" : "bg-white"
      } hover:ghost`}
      variant={operationType === "SALE" ? "outline" : "ghost"}
      onClick={() =>
        setFilters((prev) => ({
          ...prev,
          operationType: "SALE",
        }))
      }
    >
      Buy
    </Button>

    <Button
      className={`rounded-none h-12 sm:h-[45px] grow ${
        operationType === "RENT" ? "bg-primary text-white" : "bg-white"
      } hover:ghost`}
      variant={operationType === "RENT" ? "outline" : "ghost"}
      onClick={() =>
        setFilters((prev) => ({
          ...prev,
          operationType: "RENT",
        }))
      }
    >
      Rent
    </Button>
  </div>

  <div className="relative w-full sm:flex-1">
    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
      <MapPin size={18} />
    </div>
    <Input
      className="pl-10 h-12 focus:ring-0 focus-visible:ring-0 z-60 relative placeholder:text-[#414042] w-full"
      placeholder="Search by City, Community, Tower"
      value={location}
      onChange={handleLocationChange}
    />
    {suggestions && suggestions?.length > 0 && (
      <div
        className="custom-scrollbar absolute left-0 right-0 bg-white border border-gray-300 mt-1 rounded-md shadow-lg z-10"
        ref={suggestionsRef}
      >
        <OverlayScrollbarsComponent
          options={{ scrollbars: { autoHide: "leave" } }}
          className="max-h-60 bg-white"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                handleSelect(suggestion);
                setSuggestions([]);
              }}
            >
              <div className="flex flex-col">
                <span className="font-medium">{suggestion.title}</span>
                {suggestion.subtitle && (
                  <span className="text-sm text-gray-500">
                    {suggestion.subtitle}
                  </span>
                )}
              </div>
            </div>
          ))}
        </OverlayScrollbarsComponent>
      </div>
    )}
  </div>

  <div className="hidden sm:grid grid-cols-1 md:grid-cols-[160px_1fr_1fr_1fr] gap-2 w-full md:w-auto custom-shadow-button">
    <Popover open={propertyTypeOpen} onOpenChange={setPropertyTypeOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="rounded-md font-medium h-12 sm:h-[48px] text-ellipsis text-[#6e6d6e]"
        >
          Property Type
          {propertyTypeOpen ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[350px] bg-white border rounded-md shadow-lg p-1"
        side="bottom"
      >
        <PropertyTypeFilter render="map-search" />
      </PopoverContent>
    </Popover>
    <BedsPathsFilter render="map-search"/>
    <SliderPrice priceRange={priceRange} />
    <Select
      value={completionStatus}
      onValueChange={handleCompletionStatusChange}
      disabled={isRent}
    >
      <SelectTrigger className="h-12 focus:ring-0 min-w-[180px] shadow-none">
        <SelectValue placeholder="Completion status">
          {completionStatus === "READY"
            ? "Ready"
            : completionStatus === "OFFPLAN"
            ? "Off Plan"
            : "Completion Status"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="any">Any</SelectItem>
        <SelectItem value="ready">Ready</SelectItem>
        <SelectItem value="offplan">Off Plan</SelectItem>
      </SelectContent>
    </Select>
  </div>

  <div className="flex items-center gap-2 w-full sm:w-auto">
   
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`w-12 border rounded-md h-12 sm:h-[49px] ${
            isOpen && "bg-[#FCEDE9] border-[#f15a29]"
          }`}
        >
          <AdvanceIcon
            className={`size-6 ml:2 ${isOpen && "text-[#f15a29]"}`}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full sm:w-[600px] p-0 m-0">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b p-3">
            <X
              className="cursor-pointer h-4 w-4"
              onClick={() => setIsOpen(false)}
            />
            <h3 className="text-lg font-semibold text-center flex-1">
              Filters
            </h3>
          </div>
          <AddtionalFilter
            render="map-search"
            mapContainerRef={
              mapContainerRef as React.RefObject<mapboxgl.Map>
            }
          />
        </div>
      </PopoverContent>
    </Popover>

    <Button
      className="h-12 w-full sm:w-auto rounded-sm bg-[#2C2D65] hover:bg-[#22254a] text-white px-4 sm:px-12"
      onClick={handleSearch}
    >
      Search
    </Button>
  </div>
</div>
    </div>
  );
}
