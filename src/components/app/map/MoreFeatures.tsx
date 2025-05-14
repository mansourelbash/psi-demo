"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { filtersAtom, mainFiltersAtom } from "@/atoms/MapFilterAtoms";
import { useAtom } from "jotai";

export default function MoreFeatures({
  render
}: {
  render?: string
}) {
//   const [, setVillaLocation] = useState("Location Corner");
//   const [, setOfficeType] = useState("Shell and Core");
  const [floors, setFloors] = useState("1");
  const store = render === 'map-search' ? filtersAtom : mainFiltersAtom
  
  const [filters, setFilters] = useAtom(store)
  const { propertyUsage, operationType,  plotSizeFrom, plotSizeTo, propertyType, officeType, villaLocation } = filters;
  const isDisabled = propertyUsage === "COMMERCIAL";
  const isSALE = operationType === "SALE";

  const handlePlotSizeFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const parsedValue = value ? parseFloat(value) : undefined
    setFilters((prev) => ({
      ...prev,
      plotSizeFrom: parsedValue,
    }))
  }

  const handlePlotSizeToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const parsedValue = value ? parseFloat(value) : undefined
    setFilters((prev) => ({
      ...prev,
      plotSizeTo: parsedValue,
    }))
  }
  return (
    <div className="max-w-2xl mx-auto mt-4">
      <div className="space-y-4">
        {!isDisabled && (propertyType.includes("Villa") || propertyType.includes("Townhouse") ) && (
          <>
            {/* Plot Size */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Plot Size
              </h3>

              <div className="flex items-center gap-2">
              <Input
              type="number"
                placeholder="From"
                className="border border-gray-300 rounded-md"
                value={plotSizeFrom || ""}
                onChange={handlePlotSizeFromChange} 
              />
                <span className="text-gray-500">-</span>
                <Input
                 type="number"
                  placeholder="to"
                  className="border border-gray-300 rounded-md"
                  value={plotSizeTo || ""}
                  onChange={handlePlotSizeToChange} 
                />
              </div>
            </div>
            {/* Villa Location */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Villa Location
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className={`rounded-md px-3 py-1 min-w-[138px] ${
                    villaLocation === "Location Corner"
                      ? "bg-[#2e2e6f] text-white border-[#2e2e6f]"
                      : "bg-white text-gray-700 border-[#ECECEC]"
                  }`}
                  onClick={ () =>  setFilters((prev) => ({ ...prev, villaLocation: "Location Corner"}))}
                >
                  Location Corner
                </Button>
                <Button
                  variant="outline"
                  className={`rounded-md px-3 py-1 min-w-[138px] ${
                    villaLocation === "Next To Community"
                      ? "bg-[#2e2e6f] text-white border-[#2e2e6f]"
                      : "bg-white text-gray-700 border-[#ECECEC]"
                  }`}
                  onClick={() =>  setFilters((prev) => ({ ...prev, villaLocation: "Next To Community"}))}
                >
                  Next To Community
                </Button>
                <Button
                  variant="outline"
                  className={`rounded-md px-3 py-1 min-w-[138px] ${
                    villaLocation === "Beach Front"
                      ? "bg-[#2e2e6f] text-white border-[#2e2e6f]"
                      : "bg-white text-gray-700 border-[#ECECEC]"
                  }`}
                  onClick={() =>  setFilters((prev) => ({ ...prev, villaLocation: "Beach Front"}))}
                >
                  Beach Front
                </Button>
                <Button
                  variant="outline"
                  className={`rounded-md px-3 py-1 min-w-[138px] ${
                    villaLocation === "Lake"
                      ? "bg-[#2e2e6f] text-white border-[#2e2e6f]"
                      : "bg-white text-gray-700 border-[#ECECEC]"
                  }`}
                  onClick={() =>  setFilters((prev) => ({ ...prev, villaLocation: "Lake"}))}
                >
                  Lake
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Office type */}
        {isSALE && ( isDisabled && propertyType.includes("Office") ) && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Office type
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className={`rounded-md px-3 py-1 ${
                  officeType === "Shell and Core"
                    ? "bg-[#2e2e6f] text-white border-[#2e2e6f]"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
                onClick={() =>  setFilters((prev) => ({ ...prev, officeType: "Shell and Core"}))}
              >
                Shell and Core
              </Button>
              <Button
                variant="outline"
                className={`rounded-md px-3 py-1 ${
                  officeType === "Sim fitted out"
                    ? "bg-[#2e2e6f] text-white border-[#2e2e6f]"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
                onClick={() =>  setFilters((prev) => ({ ...prev, officeType: "Sim fitted out"}))}
              >
                Sim fitted out
              </Button>
              <Button
                variant="outline"
                className={`rounded-md px-3 py-1 ${
                  officeType === "Fitted out"
                    ? "bg-[#2e2e6f] text-white border-[#2e2e6f]"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
                onClick={() =>  setFilters((prev) => ({ ...prev, officeType: "Fitted out"}))}
              >
                Fitted out
              </Button>
            </div>
          </div>
        )}

        {/* Number of Floors */}
        {!isDisabled && (propertyType.includes("Villa") || propertyType.includes("Townhouse")) && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Number of Floors
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className={`rounded-md w-10 h-10 ${
                  floors === "1"
                    ? "bg-[#2e2e6f] text-white border-[#2e2e6f]"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
                onClick={() => {
                    setFloors("1"); 
                    setFilters((prev) => ({ ...prev, numberOfFloors: "1" }));
                  }}
              >
                1
              </Button>
              <Button
                variant="outline"
                className={`rounded-md w-10 h-10 ${
                  floors === "2"
                    ? "bg-[#2e2e6f] text-white border-[#2e2e6f]"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
                onClick={() => {
                    setFloors("2"); 
                    setFilters((prev) => ({ ...prev, numberOfFloors: "2" }));
                  }}
              >
                2
              </Button>
              <Button
                variant="outline"
                className={`rounded-md w-10 h-10 ${
                  floors === "3"
                    ? "bg-[#2e2e6f] text-white border-[#2e2e6f]"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
                onClick={() => {
                    setFloors("3"); 
                    setFilters((prev) => ({ ...prev, numberOfFloors: "3" }));
                  }}
              >
                3
              </Button>
              <Button
                variant="outline"
                className={`rounded-md w-10 h-10 ${
                  floors === "+4"
                    ? "bg-[#2e2e6f] text-white border-[#2e2e6f]"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
                onClick={() => {
                    setFloors("4"); 
                    setFilters((prev) => ({ ...prev, numberOfFloors: "4" }));
                  }}
              >
                +4
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
