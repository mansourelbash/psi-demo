"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SecondaryIcon } from "@/components/icons/secondary-icon";
import { PrimaryIcon } from "@/components/icons/primary-icon";
import { filtersAtom, mainFiltersAtom } from "@/atoms/MapFilterAtoms";
import { useAtom } from "jotai";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect } from "react";

export default function PropertyViewFilters({
  render
}: {
  render?: string
}) {
  const store = render === 'map-search' ? filtersAtom : mainFiltersAtom

  const [filters, setFilters] = useAtom(store);
  const {selectedPrimary, isPrimarySelected} = filters
  const [selectedViews, setSelectedViews] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (selectedPrimary.length === 0) {
      setSelectedViews([]);
    } else {
      setSelectedViews(selectedPrimary);
    }
  }, [selectedPrimary]);

  const handleViewClick = (viewName: string) => {
    setSelectedViews((prevState) => {
      const updatedViews = prevState.includes(viewName)
        ? prevState.filter((view) => view !== viewName)
        : [...prevState, viewName];
  
      setFilters((prev) => ({
        ...prev,
        selectedPrimary: updatedViews,
      }));
  
      return updatedViews;
    });
  };

  const togglePrimarySecondary = () => {
    setFilters((prev) => ({
      ...prev,
      isPrimarySelected: !isPrimarySelected,
    }));
  };

  const primaryViews = [
    "Sea View", "City View", "Garden View", "Meera", "Pool", "NMC", "Ain Dubai",
    "Beach View", "Boulevard View", "Burj View", "C53 View", "Canal View",
    "Community centre View", "Community View", "Compound View", "Corner view",
    "Cornich View", "Courtyard View", "Desert View", "Dubai Eye", "Emirates Palace",
    "Entrance View", "External road view", "Gate view", "Golf course view", "Hill view",
    "Internal road view", "Island View", "Landscape View", "Louvre View", "Main Road view",
    "Mall View", "Mangrove View", "Marina view", "Marina/Sea view", "Open water view",
    "Panoramic", "Park view", "Partial marina view", "Partial park view", "Partial sea view",
    "Penthouse view", "Private garden view", "Reem Island", "Saadiyat Island",
    "School View", "Sea Side view", "Sh. Khalifa Bridge", "Sheikh Zayed Museum", "Shopping mall View",
    "Side view", "single row view", "Sky Tower", "Street view", "Yas Island", "Yasmina/ Sea View"
  ];

  const displayedViews = showAll ? primaryViews : primaryViews.slice(0, 10);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={togglePrimarySecondary}
          className={cn(
            "flex items-center justify-center gap-3 py-2 px-4 rounded-lg",
            isPrimarySelected ? "bg-[#2e3267] text-white" : "bg-white border text-gray-700"
          )}
        >
          <PrimaryIcon className="h-6 w-6" color={isPrimarySelected ? "white" : "#2e3267"} />
          <span className="text-sm">Primary</span>
        </button>
        <button
          onClick={togglePrimarySecondary}
          className={cn(
            "flex items-center justify-center gap-3 py-2 px-3 rounded-lg border text-gray-700",
            !isPrimarySelected ? "bg-[#2e3267] text-white" : "bg-white"
          )}
        >
          <SecondaryIcon className="h-6 w-6" color={!isPrimarySelected ? "white" : "#2e3267"} />
          <span className="text-sm">Secondary</span>
        </button>
      </div>

      <h3 className="text-md font-medium text-gray-700 mb-6">
        {isPrimarySelected ? "Primary Views" : "Secondary Views"}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {displayedViews.map((option) => (
          <button
            key={option}
            onClick={() => handleViewClick(option)}
            className={cn(
              "py-2 px-3 rounded-lg border text-center transition-colors",
              selectedViews.includes(option)
                ? "bg-[#2e3267] text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            )}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-4 text-center">
        
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-3 text-[#f15a29] text-sm font-medium flex items-center gap-1"
        >
          {showAll ? "Show Less" : "Show More"}
          {showAll ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      )}
        </button>
      </div>
    </div>
  );
}
