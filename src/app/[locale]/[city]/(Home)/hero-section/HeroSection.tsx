"use client";
import { mainFiltersAtom } from "@/atoms/MapFilterAtoms";
import { Suggestion } from "@/components/app/map/SearchMap";
import { AdvanceIcon } from "@/components/icons/advance-icon";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import { useAtom } from "jotai";
import { debounce } from "lodash";
import Image from "next/image";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import PropertyTypeFilter from "@/components/app/map/PropertyTypeFilter";
import AddtionalFilter from "@/components/app/map/AddtionalFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BedsPathsFilter from "@/components/app/map/BedsPathsFilter";
import SliderPrice from "@/components/app/map/SliderPrice";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
export const HeroSection = () => {
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const [filters, setFilters] = useAtom(mainFiltersAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [searchType, setSearchType] = useState("unit");

  const { operationType, completionStatus, priceRange } = filters;
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [propertyTypeOpen, setPropertyTypeOpen] = useState(false);
  const isRent = operationType === "RENT";
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isIpad = useMediaQuery({ maxWidth: 992 });
  const [ratio, setRatio] = useState(16 / 7.2);
  const handleCompletionStatusMainFilterChange = (
    item: "ANY" | "READY" | "OFFPLAN"
  ) => {
    setFilters((prev) => ({
      ...prev,
      completionStatus: item.toUpperCase() as "ANY" | "OFFPLAN" | "READY",
    }));
  };
  useEffect(() => {
    setRatio(isMobile ? 3 / 7 : isIpad ? 6 / 7.2 : 16 / 7.2);
  }, [isMobile, isIpad]);
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLocation = e.target.value;
    setLocation(newLocation);

    if (newLocation.trim() === "") {
      setFilters((prev) => ({ ...prev, selectedCity: "" }));
    } else {
      fetchSuggestions();
    }
  };
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const handleSearchButton = () => {
    router.push("/search");
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
    [API_URL, location]
  );

  const handleSelect = (item: Suggestion) => {
    if (item?.city_id) {
      setFilters((prev) => ({
        ...prev,
        cityId: item.city_id,
        locationName: item.title,
      }));
      setLocation(item.title);
    } else {
      if (!location) {
        setFilters((prev) => ({ ...prev, cityId: "", locationName: "" }));
        setLocation("");
      }
    }
    (document.activeElement as HTMLElement)?.blur();
  };

  return (
    <Container className="rounded-[20px]">

         <div 
        className="relative w-full flex items-center rounded-cover-image" 
        style={{
          paddingTop: '200px',
          paddingBottom: `${30 / ratio}%`,
          position: 'relative'
        }}
      >
        <Image
          src={"/images/hero.png"}
          alt="Hero"
          fill
          className="object-cover absolute top-0 left-0 -z-10"
        />
        <div className="space-y-12 grow">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold text-white text-center">
            Find Your Perfect Home in the UAE
          </h1>
          <div className="flex flex-col items-center gap-4 sm:gap-5 w-full px-2 sm:px-0">
            <div className="inline-flex rounded-lg overflow-hidden w-full sm:w-auto">
              <Button
                className={`rounded-none h-12 sm:h-[55px] w-full sm:w-[125px] border-0 ${
                  searchType === "unit" ? "bg-primary text-white" : "bg-white"
                }`}
                variant={searchType === "unit" ? "outline" : "ghost"}
                onClick={() => {
                  setSearchType("unit");
                  setFilters((prev) => ({
                    ...prev,
                    searchType: "unit",
                  }));
                }}
              >
                Unit
              </Button>

              <Button
                className={`rounded-none h-12 sm:h-[55px] w-full sm:w-[125px] border-0 ${
                  searchType === "project"
                    ? "bg-primary text-white"
                    : "bg-white"
                }`}
                variant={searchType === "project" ? "outline" : "ghost"}
                onClick={() => {
                  setSearchType("project");
                  setFilters((prev) => ({
                    ...prev,
                    searchType: "project",
                  }));
                }}
              >
                Project
              </Button>
            </div>

            <div className="bg-white/90 sm:bg-secondary-white rounded-xl sm:rounded-[24px] w-full max-w-[1307px] md:w-[100%] sm:w-[95%] p-3 sm:p-6">
              <div className="w-full space-y-3 sm:space-y-2.5">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="w-full md:basis-1/4 sm:basis-1/4 inline-flex  rounded-sm overflow-hidden border">
                    <Button
                      className={`rounded-none h-12 sm:h-[55px] w-full ${
                        operationType === "SALE"
                          ? "bg-primary text-white"
                          : "bg-white"
                      }`}
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
                      className={`rounded-none h-12 sm:h-[55px] w-full ${
                        operationType === "RENT"
                          ? "bg-primary text-white"
                          : "bg-white"
                      }`}
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

                  <div className="w-full md:basis-1/2 sm:basis-1/2 relative h-12 sm:h-[55px]">
                    <MapPin
                      size={18}
                      className="absolute start-3 sm:start-4 top-1/2 -translate-y-1/2 pointer-events-none z-10"
                    />
                    <Input
                      className="h-full bg-white sm:bg-background ps-9 sm:ps-10 focus:ring-0 focus-visible:ring-0 placeholder:font-medium placeholder:text-gray-700 sm:placeholder:text-[#414042]"
                      placeholder="Search by City, Community..."
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
                                <span className="font-medium">
                                  {suggestion.title}
                                </span>
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

                  <div className="w-full sm:basis-1/4 h-12 sm:h-[55px]">
                    <Select
                      value={completionStatus}
                      onValueChange={handleCompletionStatusMainFilterChange}
                      disabled={isRent}
                    >
                      <SelectTrigger className="focus:ring-0 w-full md:min-w-[180px] sm:min-w-[180px] border-gray-200 sm:border-[#ECECEC] h-12 sm:h-[55px] bg-white font-medium">
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
                </div>

                <div className="flex flex-col md:flex-row sm:flex-row gap-3">
                  <div className="w-full md:basis-1/4 sm:basis-1/4 h-12 sm:h-[55px]">
                    <BedsPathsFilter classNames="h-12 sm:h-[55px] md:h-[55px]" />
                  </div>

                  <div className="w-full md:basis-1/4 sm:basis-1/4 h-12 md:h-[55px] sm:h-[55px]">
                    <SliderPrice
                      classNames="h-12 md:h-[55px] sm:h-[55px]"
                      priceRange={priceRange}
                      mainFiltersAtom={mainFiltersAtom}
                    />
                  </div>

                  <div className="w-full md:basis-1/4 sm:basis-1/4 h-12 md:h-[55px] sm:h-[55px]">
                    <Popover
                      open={propertyTypeOpen}
                      onOpenChange={setPropertyTypeOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full border-gray-200 sm:border-[#ECECEC] rounded-md font-medium h-full text-ellipsis text-gray-600 sm:text-[#6e6d6e] flex justify-between items-center"
                        >
                          <span className="truncate">Property Type</span>
                          {propertyTypeOpen ? (
                            <ChevronUp className="w-4 h-4 text-gray-600" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-[90vw] md:w-[350px] sm:w-[350px] bg-white border rounded-md shadow-lg p-1"
                        side="bottom"
                      >
                        <PropertyTypeFilter render="main-search" />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="w-full md:basis-1/4 sm:basis-1/4 h-12 md:h-[55px] sm:h-[55px] flex gap-1.5">
                    <Popover open={isOpen} onOpenChange={setIsOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className={`border border-gray-300 sm:border-[#41404233] bg-transparent rounded-md h-12 sm:h-[55px] w-12 sm:w-[55px] ${
                            isOpen &&
                            "bg-orange-50 sm:bg-[#FCEDE9] border-primary sm:border-[#f15a29]"
                          }`}
                        >
                          <AdvanceIcon
                            className={`size-5 sm:size-6 ${
                              isOpen && "text-primary sm:text-[#f15a29]"
                            }`}
                          />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-[90vw] sm:w-[600px] p-0 m-0 relative z-50"
                        side="bottom"
                        align="start"
                        sideOffset={10}
                        alignOffset={1}
                        avoidCollisions={true}
                      >
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
                          <AddtionalFilter type="main-search" />
                        </div>
                      </PopoverContent>
                    </Popover>

                    <Button
                      className="flex-grow h-12 sm:h-[55px] bg-[#2C2D65] hover:bg-[#22254a] text-white px-4 md:px-10 sm:px-10"
                      onClick={() => handleSearchButton()}
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
