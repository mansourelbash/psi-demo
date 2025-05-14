"use client";

import { Container } from "@/components/ui/container";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  apiTotalPagesAtom,
  currentPageAtom,
  mainFiltersAtom,
  paginationAtom,
  unitsAtom,
  projectsAtom,
} from "@/atoms/MapFilterAtoms";
import { useAtom } from "jotai";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, MapPin, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import PropertyTypeFilter from "@/components/app/map/PropertyTypeFilter";
import BedsPathsFilter from "@/components/app/map/BedsPathsFilter";
import SliderPrice from "@/components/app/map/SliderPrice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdvanceIcon } from "@/components/icons/advance-icon";
import AddtionalFilter from "@/components/app/map/AddtionalFilter";
import { Suggestion } from "@/components/app/map/SearchMap";
import { debounce } from "lodash";
import {
  Fire,
  MapTrifold,
  SealCheck,
  SortDescending,
  TagChevron,
} from "@phosphor-icons/react";
import { UnitCard } from "@/components/app/UnitCard";
import LoaderSpinner from "@/components/app/Loader";
import { CustomPagination } from "@/components/app/CustomPagination";
import { useRouter } from "next/navigation";
import { ProjectCard } from "@/components/app/ProjectCard";
import {
  getFilterationSearchProjects,
  getFilterationSearchUnits,
} from "@/services/map-search-refactor";
export default function Page() {
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const [filters, setFilters] = useAtom(mainFiltersAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSort, setSelectedSort] = useState("NEWEST");
  const [totalPages, setTotalPages] = useAtom(apiTotalPagesAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const itemsPerPage = 16;
  const [, setPagination] = useAtom(paginationAtom);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setPagination({ pageNumber: page });
  };

  const baseSortOptions = [
    { label: "Newest", value: "NEWEST" },
    { label: "Featured", value: "FEATURED" },
    { label: "Price High", value: "PRICE_HIGH" },
    { label: "Price Low", value: "PRICE_LOW" },
  ];
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClick = (value: string) => {
    setSelectedSort(value);
    setFilters((prev) => ({ ...prev, sortBy: value }));
    setOpen(false);
  };
  const {
    searchType,
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
    plotSizeFrom,
    plotSizeTo,
    selectedPrimary,
    isPrimarySelected,
    numberOfFloors,
    locationFeatures,
    villaLocation,
    officeType,
    locationName,
    sortBy,
  } = filters;
  const sortOptions =
    searchType === "project"
      ? [...baseSortOptions, { label: "Oldest", value: "OLDEST" }]
      : baseSortOptions;
  const [location, setLocation] = useState(locationName);
  const [propertyTypeOpen, setPropertyTypeOpen] = useState(false);
  const [, setUnits] = useAtom(unitsAtom);
  const [, setProjects] = useAtom(projectsAtom);
  const [units] = useAtom(unitsAtom);
  const [projects] = useAtom(projectsAtom);

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const isRent = operationType === "RENT";

  const handleSelect = (item: Suggestion | null) => {
    if (item && item.city_id) {
      setFilters((prev) => ({ ...prev, cityId: item.city_id }));
      setLocation(item.title);
    } else {
      setFilters((prev) => ({ ...prev, cityId: "" }));
      setLocation("");
    }

    (document.activeElement as HTMLElement)?.blur();
  };

  const fetchSuggestions = useCallback(
    debounce(async () => {
      if (!location || location.length < 2) {
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

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLocation = e.target.value;
    setLocation(newLocation);
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, pageNumber: 1 }));

    if (newLocation.trim() === "") {
      setFilters((prev) => ({ ...prev, cityId: "" }));
    } else {
      fetchSuggestions();
    }
  };

  useLayoutEffect(() => {
    setUnits([]);
    setProjects([]);

    handleSearch();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [currentPage]);

  const handleCompletionStatusChange = (item: "ANY" | "READY" | "OFFPLAN") => {
    setFilters((prev) => ({
      ...prev,
      completionStatus: item.toUpperCase() as "ANY" | "OFFPLAN" | "READY",
    }));
  };
  const handleSearch = async () => {
    setIsLoading(true);

    try {
      if (!location) {
        setFilters((prev) => ({ ...prev, selectedCity: "" }));
      }

      if (searchType == "unit") {
        const newData = await getFilterationSearchUnits({
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
          plotSizeFrom,
          plotSizeTo,
          selectedPrimary,
          isPrimarySelected,
          numberOfFloors,
          locationFeatures,
          villaLocation,
          officeType,
          mapView: false,
          sortBy,
          pageSize: itemsPerPage,
        });
        if (newData) {
          setUnits(newData.items);
          setProjects([]);
          const total = newData.total;
          setTotalPages(total);
        }
      }
      if (searchType == "project") {
        const newData = await getFilterationSearchProjects({
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
          plotSizeFrom,
          plotSizeTo,
          selectedPrimary,
          isPrimarySelected,
          numberOfFloors,
          locationFeatures,
          villaLocation,
          officeType,
          mapView: false,
          sortBy,
          pageSize: itemsPerPage,
        });
        if (newData) {
          setProjects(newData.items);
          setUnits([]);
          const total = newData.total;
          setTotalPages(total);
        }
      }
    } catch (error) {
      console.error("Error fetching map data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMapSearch = async () => {
    await router.push("/");
    setTimeout(() => {
      const el = document.getElementById("map-search-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 1000);
  };

  useEffect(() => {
    handleSearch();
  }, [selectedSort]);

  return (
    <Container>
      <h1 className="text-center text-[#2C2D65] text-3xl font-bold mt-[50px] mb-[30px]">
        {" "}
        Available {searchType == "unit" ? "Properties" : "Projects"} in UAE
      </h1>
      <div className="flex flex-col max-sm:flex-row md:flex-row items-center gap-2 pb-2 mb-[20px] w-full flex-wrap">
        <div className="w-full flex flex-col sm:flex-row sm:gap-2 md:flex-1 lg:w-[15.76%] rounded-sm overflow-hidden border">
          <Button
            className={`w-full sm:w-1/2 h-[45px] rounded-none ${
              filters.operationType === "SALE"
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
            className={`w-full sm:w-1/2 h-[45px] rounded-none ${
              operationType === "RENT" ? "bg-primary text-white" : "bg-white"
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

        <div className="relative w-full md:flex-1 md:inline-block lg:w-[21%] max-sm:flex-grow">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <MapPin size={18} />
          </div>
          <Input
            className="pl-10 h-12 focus:ring-0 focus-visible:ring-0 z-60 relative placeholder:text-[#414042]"
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

        <div className="w-full py-2 md:py-0 md:w-[48%] lg:w-[40%] lg:flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-2 custom-shadow-button">
          <Popover open={propertyTypeOpen} onOpenChange={setPropertyTypeOpen}>
            <PopoverTrigger asChild className="justify-between">
              <Button
                variant="outline"
                className="rounded-md border-[#ECECEC] font-medium h-[48px] text-ellipsis text-[#6e6d6e] text-left w-full"
              >
                Property Types
                {propertyTypeOpen ? (
                  <ChevronUp className="w-4 h-4 text-gray-600 ml-auto" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-600 ml-auto" />
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="w-[350px] bg-white border rounded-md shadow-lg p-1 z-[33333]"
              side="bottom"
            >
              <PropertyTypeFilter />
            </PopoverContent>
          </Popover>

          <div className="w-full">
            <BedsPathsFilter />
          </div>

          <div className="w-full">
            <SliderPrice
              priceRange={priceRange}
              mainFiltersAtom={mainFiltersAtom}
            />
          </div>

          <div className="w-full">
            <Select
              value={filters.completionStatus}
              onValueChange={handleCompletionStatusChange}
              disabled={isRent}
            >
              <SelectTrigger className="border rounded-md h-12 focus:ring-0 min-w-full shadow-none text-left">
                <SelectValue placeholder="Completion Status">
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

        <div className="flex items-center gap-2 w-full md:w-auto max-sm:flex-1">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={`w-12 border rounded-md h-[49px] ${
                  isOpen && "bg-[#FCEDE9] border-[#f15a29]"
                }`}
              >
                <AdvanceIcon
                  className={`size-6 ml:2 ${isOpen && "text-[#f15a29]"}`}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[600px] p-0 m-0 bg-white z-[55555]">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b p-3 ">
                  <X
                    className="cursor-pointer h-4 w-4"
                    onClick={() => setIsOpen(false)}
                  />
                  <h3 className="text-lg font-semibold text-center flex-1">
                    {" "}
                    Filters
                  </h3>
                </div>
                <AddtionalFilter />
              </div>
            </PopoverContent>
          </Popover>

          <Button
            className="h-12 w-full md:w-auto rounded-sm bg-[#2C2D65] hover:bg-[#22254a] text-white px-12"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
      {/* save search labels*/}
      <div className="my-[20px] flex justify-between gap-4">
        <div className="flex flex-row gap-3">
          <div className="flex items-center justify-start gap-2 border border-[#E0592A] text-[#E0592A] bg-[#FDF4F280] px-1 py-1 rounded-[8px]">
            <Fire size={24} />
            Hot Deals First
          </div>
          <div className="flex items-center justify-start gap-2 border border-[#2C2D65] text-[#2C2D65] bg-[#F4F4FA80] px-1 py-1 rounded-[8px]">
            <SealCheck size={24} />
            Verified Units
          </div>
        </div>
        <div className="flex items-center justify-start gap-2 border border-[#2C2D65] text-[#2C2D65] bg-white px-1 py-1 rounded-[8px]">
          <TagChevron size={20} className="rotate-90" />
          Save Search
        </div>
      </div>
      <hr />

      {/* result of search items */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mt-[40px]">
        <h2 className="text-center lg:text-left text-xl sm:text-2xl text-black">
          {totalPages ?? 0}
          {searchType == "unit" ? " Units" : " Projects"} For{" "}
          <span className="text-[#E0592A] font-semibold">
            {operationType.charAt(0).toUpperCase() +
              operationType.slice(1).toLowerCase()}
          </span>{" "}
          in UAE
        </h2>

        <div className="button-search flex flex-col sm:flex-row gap-3 z-40 justify-center lg:justify-end">
          <Button
            variant="primary-blue"
            className="w-full sm:w-[200px] h-[50px] rounded-lg"
            onClick={handleMapSearch}
          >
            <MapTrifold size={22} />
            Search by Map
          </Button>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full sm:w-[130px] h-[50px] rounded-lg text-[#2C2D65] border-[#2C2D65] flex items-center justify-center gap-2"
              >
                <SortDescending size={22} />
                {sortOptions.find((option) => option.value === selectedSort)
                  ?.label || "Sort by"}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="w-[180px] relative p-2 z-[23333] bg-white"
              side="bottom"
              align="start"
            >
              <div className="flex flex-col gap-1 px-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleClick(option.value)}
                    className={`text-left px-3 py-2 rounded-md hover:bg-gray-100 ${
                      selectedSort === option.value
                        ? "bg-gray-200 font-semibold"
                        : ""
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="relative">
        <div>
          {isLoading ? (
            <div className="relative inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
              <LoaderSpinner />
            </div>
          ) : (
            <>
              <div className="text-center p-30">
                {!!units.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
                    {units.map((unit, index) => (
                      <UnitCard
                        classNames="w-full"
                        key={index}
                        unit={unit as never}
                        operation={
                          operationType === "SALE" || operationType === "RENT"
                            ? operationType
                            : "SALE"
                        }
                      />
                    ))}
                  </div>
                ) : (
                  ""
                )}

                {!!projects.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
                    {projects.map((project, index) => (
                      <ProjectCard
                        className="w-full"
                        key={index}
                        project={project as never}
                      />
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>

              {!!units && !!projects && (
                <CustomPagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(totalPages / itemsPerPage)}
                  onPageChange={handlePageChange}
                  showFirstLast={true}
                  maxVisiblePages={2}
                />
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
