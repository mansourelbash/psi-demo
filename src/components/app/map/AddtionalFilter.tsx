"use client";

import React, { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useAtom, useSetAtom } from "jotai";
import {
  apiTotalPagesAtom,
  filtersAtom,
  mainFiltersAtom,
  unitsAtom,
} from "@/atoms/MapFilterAtoms";
import { mapItemsAtom } from "./MapSearch";
// import * as SliderPrimitive from "@radix-ui/react-slider";
import { DubaiIcon } from "@/components/icons/cities/dubai";
import { AbuDhabiIcon } from "@/components/icons/cities/abuDhabi";
import { SharjahIcon } from "@/components/icons/cities/sharjah";
import { RasAlkhiamehIcon } from "@/components/icons/cities/rasAlkhiameh";
import { AlainIcon } from "@/components/icons/cities/alain";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import RangeSlider from "../RangeSlider";
import { useRef } from "react";
import { PropertySizeIcon } from "@/components/icons/propertySizeIcon";
import MoreFeatures from "./MoreFeatures";
import PropertyViewFilters from "./PropertyViewFilters";
import MoreDetailsForm from "./MoreDetailsFilter";
// import PropertyTypeFilter from "./PropertyTypeFilter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { othersItems } from "@/data";
import { MapSearchItems } from "@/types/mapSearch";
import { DefaultPaginate } from "@/types/Shared";
import { UnitModelModel } from "@/types/Unit";
import { getFilterationSearchUnits } from "@/services/map-search-refactor";
import { useRouter } from "next/navigation";

const AddtionalFilter = ({
  mapContainerRef,
  render,
  type,
}: {
  mapContainerRef?: React.RefObject<mapboxgl.Map>;
  render?: string;
  type?: string;
}) => {
  const store = render === "map-search" ? filtersAtom : mainFiltersAtom;
  const [filters, setFilters] = useAtom(store);
  const [showAll, setShowAll] = useState(false);
  const [showAllBuildings, setShowAllBuildings] = useState(false);
  // const [range, setRange] = useState([500, 5000]);
  const trackPropertyRef = useRef<HTMLDivElement | null>(null);
  const [, setApiTotalPages] = useAtom(apiTotalPagesAtom);

  const [leftPropertyPosition, setLeftPropertyPosition] = useState<number>(0);
  const [rightPropertyPsoition, setRightPropertyPosition] =
    useState<number>(100);

  const [minPropertyValue, setMinPropertyValue] = useState<number>(0);
  const [maxPropertyValue, setMaxPropertyValue] = useState<number | null>(0);

  const handleMinPropertySizeChange = (value: number) => {
    const newMinValue = Math.min(value, maxPropertyValue || 500);
    setMinPropertyValue(newMinValue);

    if (trackPropertyRef.current) {
      const newPosition = (newMinValue / (maxPropertyValue || 500)) * 100;
      setLeftPropertyPosition(Math.min(newPosition, rightPropertyPsoition - 5));
    }
  };

  const handleMaxPropertySizeChange = (value: number) => {
    const newMaxValue = Math.max(value, minPropertyValue);
    setMaxPropertyValue(newMaxValue);

    if (trackPropertyRef.current) {
      const newPosition = (newMaxValue / 500) * 100;
      setRightPropertyPosition(Math.max(newPosition, leftPropertyPosition + 5));
    }
  };

  const cities = [
    { name: "Dubai", icon: <DubaiIcon /> },
    { name: "Abu Dhabi", icon: <AbuDhabiIcon /> },
    { name: "Sharjah", icon: <SharjahIcon /> },
    { name: "Ras Al Khaimah", icon: <RasAlkhiamehIcon /> },
    { name: "Al Ain", icon: <AlainIcon /> },
  ];
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
    // developerName,
    plotSizeFrom,
    plotSizeTo,
    selectedPrimary,
    isPrimarySelected,
    numberOfFloors,
    locationFeatures,
    villaLocation,
    officeType,
  } = filters;

  const setMapItems = useSetAtom(mapItemsAtom);
  const setUnitsItemsSearch = useSetAtom(unitsAtom);
  const isSale = operationType === "SALE";
  const router = useRouter();

  const handleShowResults = async () => {
    let newData: MapSearchItems[] | DefaultPaginate<UnitModelModel>;
    const commonParams = {
      completionStatus,
      cityId,
      propertyType,
      priceRange: [priceRange[0], priceRange[1]] as [number, number],
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
      mapView: render === "map-search",
    };
    if (render === "map-search") {
      newData = await getFilterationSearchUnits<MapSearchItems[]>(commonParams);
      setMapItems(newData);
    } else {
      newData = await getFilterationSearchUnits<
        DefaultPaginate<UnitModelModel>
      >(commonParams);
      setUnitsItemsSearch(newData?.items);
      setApiTotalPages(newData.total);
    }

    mapContainerRef?.current?.flyTo({
      center: [54.3773, 24.4539],
      zoom: 7,
    });
    if (type == "main-search") {
      router.push("/search");
    }
  };
  const isCommerical = propertyUsage === "COMMERCIAL";
  const isRent = operationType === "RENT";

  const toggleSelection = (key: keyof typeof filters, item: string) => {
    setFilters((prev) => {
      const currentSelection = prev[key] as string[];
      const isSelected = currentSelection.includes(item);

      const newState = {
        ...prev,
        [key]: isSelected
          ? currentSelection.filter((i) => i !== item)
          : [...currentSelection, item],
      };
      return newState;
    });
  };

  const resetFilters = () => {
    setFilters({
      ...filters,
      completionStatus: "ANY",
      cityId: "",
      propertyType: [],
      developer: "",
      priceRange: [0, 0],
      petsAllowed: "",
      selectedCity: "",
      squareFeet: { min: "", max: "" },
      selectedUnitRate: [""],
      selectedCompletion: "ANY",
      selectedFurnishing: [""],
      selectedFloorHeight: "",
      selectedAmenities: [],
      selectedPopular: [],
      selectedInProperty: [],
      selectedBuildingCommunity: [],
      selectedUnitFeatures: [],
      outdoorSelection: [],
      otherSelection: [],
      operationType: "SALE",
      propertyUsage: "RESIDENTIAL",
      propertySize: [0, 0],
      handoverFrom: "",
      handoverTo: "",
      unitRefNumber: "",
      developerName: "",
      selectedPrimary: [],
      isPrimarySelected: false,
      plotSizeFrom: 0,
      plotSizeTo: 0,
      numberOfFloors: "",
      locationFeatures: 0,
      bathrooms: "",
      bedrooms: "",
    });
  };

  return (
    <div className="min-h-[500px]">
      {/* <PropertyTypeFilter render="map-search" /> */}
      <div className="border-b border-[#ECECEC] pb-6 mb-4 mx-4">
        <h3 className="text-gray-700 mb-3 font-medium">City</h3>
        <div className="flex flex-row gap-3">
          {cities.map((city) => (
            <button
              key={city.name}
              className={`text-sm rounded-md p-1 w-[90px] h-[90px] ${
                selectedCity === city.name
                  ? "text-[#1e2b5e] border border-[#1e2b5e]"
                  : "text-gray-700 bg-gray-100"
              }`}
              onClick={() =>
                setFilters((prev) => ({ ...prev, selectedCity: city.name }))
              }
            >
              <div className="flex flex-col items-center justify-center gap-1 border-gray-200 rounded-md mb-1">
                <div
                  className="mb-1 p-2 w-15 h-12"
                  style={{
                    color:
                      selectedCity === city.name ? "#1e2b5e" : "currentColor",
                  }}
                >
                  {city.name === "Dubai" && (
                    <DubaiIcon
                      color={selectedCity === city.name ? "#1e2b5e" : "#000"}
                    />
                  )}
                  {city.name === "Abu Dhabi" && (
                    <AbuDhabiIcon
                      color={selectedCity === city.name ? "#1e2b5e" : "#000"}
                    />
                  )}
                  {city.name === "Sharjah" && (
                    <SharjahIcon
                      color={selectedCity === city.name ? "#1e2b5e" : "#000"}
                    />
                  )}
                  {city.name === "Ras Al Khaimah" && (
                    <RasAlkhiamehIcon
                      color={selectedCity === city.name ? "#1e2b5e" : "#000"}
                    />
                  )}
                  {city.name === "Al Ain" && (
                    <AlainIcon
                      color={selectedCity === city.name ? "#1e2b5e" : "#000"}
                    />
                  )}
                </div>
                <span
                  className={`${
                    selectedCity === city.name
                      ? "text-[#1e2b5e] font-semibold"
                      : "text-[#000]"
                  } text-[12px] ${
                    city.name === "Sharjah" || city.name === "Ras Al Khaimah"
                      ? "relative bottom-2.5"
                      : ""
                  }`}
                >
                  {city.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 mx-4 w-[90%]">
        <h3 className="text-gray-700 mb-3 font-medium">Property Size</h3>
        <div className="">
          <RangeSlider
            min={0}
            max={10000}
            minValue={minPropertyValue}
            maxValue={maxPropertyValue}
            onMinChange={handleMinPropertySizeChange}
            onMaxChange={handleMaxPropertySizeChange}
            trackColor="bg-gray-400"
            handleColor="bg-[#2C2D65]"
            buttonClass="text-sm text-red-500 pl-1 hidden"
            buttonText="Reset"
            onReset={resetFilters}
            trackRef={trackPropertyRef}
            minPlaceholder="From"
            maxPlaceholder="to"
            Icon={PropertySizeIcon}
            height="h-35"
            propertySize={propertySize}
            inputGap="gap-40"
            atom={render === "map-search" ? filtersAtom : mainFiltersAtom}
          />
        </div>
      </div>

      <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="max-h-[80vh] overflow-y-auto custom-scrollbar">
          <Accordion type="single" collapsible className="px-4 mb-6">
            <AccordionItem value="unit-details" className="border-b">
              <AccordionTrigger className="py-3 text-gray-700 hover:no-underline">
                Unit Details
              </AccordionTrigger>
              <AccordionContent>
                {/* Furnishing */}
                {propertyType.includes("Office") && isCommerical && (
                  <div className="mb-4 ">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Furnishing
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Furnished", "Unfurnished", "Partly furnished"].map(
                        (item) => (
                          <button
                            key={item}
                            onClick={() =>
                              toggleSelection("selectedFurnishing", item)
                            }
                            className={`px-4 py-2 text-sm rounded-md ${
                              selectedFurnishing.includes(item)
                                ? "text-white bg-[#1e2b5e]"
                                : "text-gray-700 bg-gray-100"
                            }`}
                          >
                            {item}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Floor Height */}
                <div className="mb-4 ">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Floor Height
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["High", "Mid", "Low", "Any"].map((item) => (
                      <button
                        key={item}
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            selectedFloorHeight: item,
                          }))
                        }
                        className={`px-4 py-2 text-sm rounded-md min-w-[138px] ${
                          selectedFloorHeight === item
                            ? "text-white bg-[#1e2b5e]"
                            : "text-gray-700 bg-gray-100"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Unit Rate */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Unit Rate
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Ready to Move",
                      "Hot Deals",
                      "Luxury",
                      "Most liked",
                      "Featured",
                      ...(isRent ? [] : ["Higher ROI"]),
                    ]
                      .filter((item) =>
                        completionStatus === "OFFPLAN"
                          ? item !== "Ready to Move"
                          : true
                      )
                      .map((item) => (
                        <button
                          key={item}
                          onClick={() =>
                            toggleSelection("selectedUnitRate", item)
                          }
                          className={`px-4 py-2 text-sm rounded-md min-w-[138px] ${
                            selectedUnitRate.includes(item)
                              ? "text-white bg-[#1e2b5e]"
                              : "text-gray-700 bg-gray-100"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Handover Date */}
                {!isRent && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Handover Date
                    </h3>
                    <div className="mb-4">
                      <div className="flex items-center gap-10 ml-1">
                        <DatePicker
                          selected={
                            filters.handoverFrom
                              ? new Date(filters.handoverFrom)
                              : null
                          }
                          onChange={(date) =>
                            setFilters((prev) => ({
                              ...prev,
                              handoverFrom: date
                                ? format(date, "yyyy-MM")
                                : prev.handoverFrom,
                            }))
                          }
                          dateFormat="MM/yyyy"
                          showMonthYearPicker
                          customInput={
                            <Input placeholder="From" className="w-40" />
                          }
                        />

                        <span className="text-gray-500">-</span>

                        <DatePicker
                          selected={
                            filters.handoverTo
                              ? new Date(filters.handoverTo)
                              : null
                          }
                          onChange={(date) =>
                            setFilters((prev) => ({
                              ...prev,
                              handoverTo: date
                                ? format(date, "yyyy-MM")
                                : prev.handoverTo,
                            }))
                          }
                          dateFormat="MM/yyyy"
                          showMonthYearPicker
                          customInput={
                            <Input placeholder="To" className="w-40" />
                          }
                          minDate={
                            filters.handoverFrom
                              ? new Date(filters.handoverFrom)
                              : undefined
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Unit Features */}
                {!isCommerical && (
                  <div className="mb-4 ">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Unit Features
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Maid Room",
                        "Driver Room",
                        "Balcony",
                        "Terrace",
                        "Store Room",
                        "Private Pool",
                      ].map((item) => (
                        <button
                          key={item}
                          onClick={() =>
                            toggleSelection("selectedUnitFeatures", item)
                          }
                          className={`px-4 py-2 text-sm rounded-md ${
                            selectedUnitFeatures.includes(item)
                              ? "text-white bg-[#1e2b5e]"
                              : "text-gray-700 bg-gray-100"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>

            {((isCommerical && propertyType.includes("Office") && isSale) ||
              propertyType.includes("Villa") ||
              propertyType.includes("Townhouse")) && (
              <AccordionItem value="more-features" className="border-b">
                <AccordionTrigger className="py-3 text-gray-700 hover:no-underline">
                  More Features
                </AccordionTrigger>
                <AccordionContent>
                  <MoreFeatures render={render} />
                </AccordionContent>
              </AccordionItem>
            )}

            <AccordionItem value="property-views" className="border-b">
              <AccordionTrigger className="py-3 text-gray-700 hover:no-underline">
                Property Views
              </AccordionTrigger>
              <AccordionContent>
                <PropertyViewFilters render={render} />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="amenities" className="border-b">
              <AccordionTrigger className="py-3 text-gray-700 hover:no-underline">
                Amenities
              </AccordionTrigger>
              <AccordionContent>
                <div>
                  {/* Amenities */}
                  {!isCommerical && (
                    <div className="md:col-span-2 mb-4 pb-3 border-gray-300">
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Central A/C",
                          "Maids Room",
                          "Balcony",
                          "Shared Pool",
                          "Shared Spa",
                          "Shared Gym",
                          "Covered Parking",
                        ].map((item) => (
                          <button
                            key={item}
                            onClick={() =>
                              toggleSelection("selectedAmenities", item)
                            }
                            className={`px-4 py-2 text-sm rounded-md ${
                              selectedAmenities.includes(item)
                                ? "text-white bg-[#1e2b5e]"
                                : "text-gray-700 bg-gray-100"
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular */}
                  <div className="md:col-span-2 mb-4 pb-3 border-gray-300">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Popular
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Balcony",
                        "Maids Room",
                        "Storage Room",
                        "Private Pool",
                        "Parking",
                        "Pets Allowed",
                      ].map((item) => (
                        <button
                          key={item}
                          onClick={() =>
                            toggleSelection("selectedPopular", item)
                          }
                          className={`px-4 py-2 text-sm rounded-md ${
                            selectedPopular.includes(item)
                              ? "text-white bg-[#1e2b5e]"
                              : "text-gray-700 bg-gray-100"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* In the Property */}

                  <div className="md:col-span-2  mb-4 pb-3 border-gray-300">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      In the Property
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Built in Wardrobes",
                        "Kitchen Appliances",
                        "Networked",
                        "Private Gym",
                        "Study Room",
                        "Private Jacuzzi",
                        "View of Landmark",
                        "Walk-in Closet",
                      ].map((item) => (
                        <button
                          key={item}
                          onClick={() =>
                            toggleSelection("selectedInProperty", item)
                          }
                          className={`px-4 py-2 text-sm rounded-md ${
                            selectedInProperty.includes(item)
                              ? "text-white bg-[#1e2b5e]"
                              : "text-gray-700 bg-gray-100"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Building/Community */}
                  <div className="md:col-span-2  mb-4 pb-3 border-gray-300">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Building/Community
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(showAllBuildings
                        ? [
                            "Children's Play Area",
                            "Concierge",
                            "Children's Pool, Beach Access",
                            "Pantry",
                            "Study Room",
                            "Conference Room",
                            "Covered Parking",
                            "Dining in Building",
                            "Lobby in Building",
                            "Maid Service",
                            "Security",
                            "Shared Gym",
                            "Shared Pool",
                            "Beach Access",
                          ]
                        : [
                            "Children's Play Area",
                            "Concierge",
                            "Children's Pool, Beach Access",
                            "Pantry",
                            "Study Room",
                          ]
                      ).map((item) => (
                        <button
                          key={item}
                          onClick={() =>
                            toggleSelection("selectedBuildingCommunity", item)
                          }
                          className={`px-4 py-2 text-sm rounded-md ${
                            selectedBuildingCommunity.includes(item)
                              ? "text-white bg-[#1e2b5e]"
                              : "text-gray-700 bg-gray-100"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowAllBuildings(!showAllBuildings)}
                      className="mt-3 text-[#f15a29] text-sm font-medium flex items-center gap-1"
                    >
                      {showAllBuildings ? "See Less" : "See More"}{" "}
                      {showAllBuildings ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      )}
                    </button>
                  </div>

                  {/* Outdoor/Garden */}
                  <div className="md:col-span-2  mb-4 pb-3 border-gray-300">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Outdoor/Garden
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["Private Garden", "Barbecue Area"].map((item) => (
                        <button
                          key={item}
                          onClick={() =>
                            toggleSelection("outdoorSelection", item)
                          }
                          className={`px-4 py-2 text-sm rounded-md ${
                            outdoorSelection.includes(item)
                              ? "text-white bg-[#1e2b5e]"
                              : "text-gray-700 bg-gray-100"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Others */}
                  <div className="md:col-span-2 mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Others
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(showAll ? othersItems : othersItems.slice(0, 5)).map(
                        (item) => (
                          <button
                            key={item}
                            onClick={() =>
                              toggleSelection("otherSelection", item)
                            }
                            className={`px-4 py-2 text-sm rounded-md ${
                              otherSelection.includes(item)
                                ? "text-white bg-[#1e2b5e]"
                                : "text-gray-700 bg-gray-100"
                            }`}
                          >
                            {item}
                          </button>
                        )
                      )}
                    </div>
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className="mt-3 text-[#f15a29] text-sm font-medium flex items-center gap-1"
                    >
                      {showAll ? "See Less" : "See More"}{" "}
                      {showAll ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      )}
                    </button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="more-details" className="border-b">
              <AccordionTrigger className="py-3 text-gray-700 hover:no-underline">
                More Details
              </AccordionTrigger>
              <AccordionContent>
                <MoreDetailsForm render={render} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="p-4 shadow-[0_-5px_22px_-10px_rgba(0,0,0,0.4)] flex justify-between items-center">
        <button
          className="text-[#f15a29] text-sm font-medium"
          onClick={resetFilters}
        >
          Clear all
        </button>

        <div className="flex gap-3">
          <button
            onClick={handleShowResults}
            className="px-6 py-2 bg-[#f15a29] text-white rounded-md font-medium"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddtionalFilter;
