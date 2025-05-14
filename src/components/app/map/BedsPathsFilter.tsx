"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useAtom } from "jotai";
import { filtersAtom, mainFiltersAtom } from "@/atoms/MapFilterAtoms";
interface BedsPathsFilterProps {
  classNames?: string;
  render?: string; 
}
export default function BedsPathsFilter({classNames, render}:BedsPathsFilterProps) {
  const store = render === 'map-search' ? filtersAtom : mainFiltersAtom
  const [filters, setFilters] = useAtom(store);
  const [selectedBedrooms, setSelectedBedrooms] = useState<string | null>(filters.bedrooms);
  
  const { propertyUsage } = filters;

  const [selectedBathrooms, setSelectedBathrooms] = useState<string | null>(
    filters.bathrooms
  );
  const [isOpen, setIsOpen] = useState(false);

  const bedroomOptions = ["Studio", "1", "2", "3", "4", "5", "6", "+7"];
  const bathroomOptions = ["1", "2", "3", "4", "5", "6", "+7"];

  const handleBedroomSelect = (value: string) => {
    const newValue = value === selectedBedrooms ? null : value;
    setSelectedBedrooms(value === selectedBedrooms ? null : value);
    setFilters((prev) => ({ ...prev, bedrooms: newValue }));
  };

  const handleBathroomSelect = (value: string) => {
    const newValue = value === selectedBathrooms ? null : value;
    setSelectedBathrooms(value === selectedBathrooms ? null : value);
    setFilters((prev) => ({ ...prev, bathrooms: newValue }));
  };

  const resetFilters = () => {
    setSelectedBedrooms(null);
    setSelectedBathrooms(null);
    setFilters((prev) => ({ ...prev, bathrooms: "0" }));
    setFilters((prev) => ({ ...prev, bedrooms: "0" }));
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  const isDisabled = propertyUsage === "COMMERCIAL";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`justify-between h-[48px] overflow-hidden border-[#ECECEC] ${classNames ? `${classNames}` : ''} ${
            selectedBedrooms || selectedBathrooms ? "w-full" : "w-full"
          }`}
          onClick={toggleOpen}
          disabled={isDisabled}
        >
          {selectedBedrooms || selectedBathrooms ? (
            <span className="truncate whitespace-nowrap overflow-hidden text-ellipsis text-[#6e6d6e]">
              {selectedBedrooms &&
                (selectedBedrooms === "Studio"
                  ? "Studio"
                  : `${selectedBedrooms} Bed`)}
              {selectedBedrooms && selectedBathrooms && ", "}
              {selectedBathrooms && `${selectedBathrooms} Bath`}
            </span>
          ) : (
            <span className="truncate whitespace-nowrap overflow-hidden text-ellipsis text-[#6e6d6e]">
              Beds and Baths
            </span>
          )}

          <span className="ml-2">
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[250px] p-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Bedrooms</h3>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {bedroomOptions.map((option) => (
                <button
                  key={`bedroom-${option}`}
                  className={cn(
                    "h-[25px] border rounded text-center text-sm",
                    option === "Studio" ? "px-4" : "w-[48px]",
                    selectedBedrooms === option
                      ? "border-indigo-900 bg-indigo-200"
                      : "border-input hover:bg-accent hover:text-accent-foreground",
                    isDisabled && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => !isDisabled && handleBedroomSelect(option)}
                  disabled={isDisabled}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Bathrooms</h3>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {bathroomOptions.map((option) => (
                <button
                  key={`bathroom-${option}`}
                  className={cn(
                    "h-[25px] w-[48px] border rounded text-center text-sm",
                    selectedBathrooms === option
                      ? "border-indigo-900 bg-indigo-200"
                      : "border-input hover:bg-accent hover:text-accent-foreground",
                    isDisabled && "opacity-50 cursor-not-allowed" // Disable button if propertyUsage is COMMERCIAL
                  )}
                  onClick={() => !isDisabled && handleBathroomSelect(option)} // Disable select action if propertyUsage is COMMERCIAL
                  disabled={isDisabled} // Disable the button if propertyUsage is COMMERCIAL
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button
            className="text-[#E0592A] hover:text-[#E0592A] text-sm font-medium"
            onClick={resetFilters}
            disabled={isDisabled} // Disable reset button if propertyUsage is COMMERCIAL
          >
            Reset
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
