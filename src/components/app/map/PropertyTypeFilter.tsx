"use client";
import React, { useState } from "react";
import { propertyTypesItems } from "@/data";
import { cn } from "@/lib/utils";
import { filtersAtom, mainFiltersAtom } from "@/atoms/MapFilterAtoms";
import { useAtom } from "jotai";
import { useEffect } from "react";

interface PropertyTypeFilterProps {
  render?: string;
  activeTabColor?: string;
  selectedItemColor?: string;
}
export type Tab = "RESIDENTIAL" | "COMMERCIAL" | "ANY"| null;
const PropertyTypeFilter: React.FC<PropertyTypeFilterProps> = ({
  activeTabColor = "text-indigo-900 border-indigo-900",
  selectedItemColor = "bg-indigo-900 text-white",
  render
}) => {

  const store = render === 'map-search' ? filtersAtom : mainFiltersAtom
  const [filters, setFilters] = useAtom(store);
  const { propertyUsage, propertyType} = filters;
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>(propertyType || []);
  const [activeTab, setActiveTab] = useState(propertyUsage);
  const togglePropertyType = (type: string) => {
    setSelectedPropertyTypes((prevSelected) => {
      const updatedSelection = prevSelected.includes(type)
        ? prevSelected.filter((item) => item !== type)
        : [...prevSelected, type];

      return updatedSelection;
    });
  };

  const handleTabChange = (tab: Tab) => {
    if (tab === "ANY") {
        setActiveTab(null);
      } else {
        setActiveTab(tab as "RESIDENTIAL" | "COMMERCIAL");
      }
    setSelectedPropertyTypes([]);
    setFilters({...filters, propertyUsage: activeTab, });
    setFilters({...filters, propertyType: selectedPropertyTypes, });
  };

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      propertyUsage: activeTab, 
      propertyType: selectedPropertyTypes,
    }));
  
  }, [activeTab, selectedPropertyTypes]);

  useEffect(() => {
    if (filters.propertyType.length === 0 && selectedPropertyTypes.length !== 0) {
      setSelectedPropertyTypes([]);
    }
  }, [filters.propertyType]);
  
  return (
    <>
      <div className="flex px-2 py-2 gap-1 w-full">
        <button
          onClick={() => handleTabChange("RESIDENTIAL")}
          className={cn(
            "w-full pb-2 px-4 text-base font-medium transition-colors border-b-2",
            activeTab === "RESIDENTIAL"
              ? activeTabColor
              : "text-gray-400 border-gray-300"
          )}
        >
          Residential
        </button>
        <button
          onClick={() => handleTabChange("COMMERCIAL")}
          className={cn(
            "w-full pb-2 px-4 text-base font-medium transition-colors border-b-2",
            activeTab === "COMMERCIAL"
              ? activeTabColor
              : "text-gray-400 border-gray-300"
          )}
        >
          Commercial
        </button>
      </div>

      <div className="mx-2 mb-3">
        <div className="flex flex-wrap gap-1 justify-center">
          {propertyTypesItems
            .filter((type) => type.category === activeTab)
            .map((type) => (
              <button
                key={type.name}
                className={`py-2 px-1 text-xs text-center rounded-md min-w-[138px] ${
                  selectedPropertyTypes.includes(type.name)
                    ? selectedItemColor
                    : "bg-white text-gray-700 border border-[#ECECEC] rounded-full"
                }`}
                onClick={() => togglePropertyType(type.name)}
              >
                {type.name}
              </button>
            ))}
        </div>
      </div>
    </>
  );
};

export default PropertyTypeFilter;
