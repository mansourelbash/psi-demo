"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { filtersAtom, mainFiltersAtom } from "@/atoms/MapFilterAtoms"
import { useAtom } from "jotai"
export default function MoreDetailsForm({
  render
}: {
  render?: string
}) {
  const [isOpen] = useState(true)
  const store = render === 'map-search' ? filtersAtom : mainFiltersAtom
  const [filters, setFilters] = useAtom(store);
  const { unitRefNumber, propertyUsage, operationType, developerName} = filters
  const isCommerical = propertyUsage === "COMMERCIAL";
  const isRent = operationType === "RENT"
  const handleUnitRefChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setFilters((prev) => ({
      ...prev,
      unitRefNumber: value,
    }))
  }

  const handleDeveloperNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setFilters((prev) => ({
        ...prev,
        developerName: value,
      }))
  }
  return (
    <div className="w-full max-w-2xl mx-auto rounded-md overflow-hidden">

      {isOpen && (
        <div className="space-y-6 mr-1">
            {!isRent && (
                <div className="flex items-center gap-40">
            <Label htmlFor="developer-name" className="text-sm font-medium text-gray-700 w-36">
              Developer Name
            </Label>
            <div className="relative flex-1 mt-1">
              <Input id="developer-name" value={developerName || ""} onChange={handleDeveloperNameChange} placeholder="Developer Name" className="pl-9" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 absolute left-3 top-3 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
            )}
          

          <div className="flex items-center gap-40">
            <Label htmlFor="unit-reference" className="text-sm  font-medium text-gray-700 w-36">
              Unit Reference
            </Label>
            <div className="relative flex-1">
            <Input
                id="unit-reference"
                value={unitRefNumber || ""}
                onChange={handleUnitRefChange}
                placeholder="Unit Reference"
                className="pl-9"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 absolute left-3 top-3 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

        {!isCommerical && (
            <div className="flex items-center gap-40">
            <Label className="text-sm font-medium text-gray-700 w-36">Pets Allowed ?</Label>
            <div className="flex items-center gap-6">
              {["yes", "no"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="pets"
                    className="hidden"
                    checked={filters.petsAllowed === option}
                    onChange={() =>
                      setFilters((prev) => ({
                        ...prev,
                        petsAllowed: option as "yes" | "no",
                      }))
                    }
                  />
                  <span
                    className={`w-4 h-4 border rounded-full flex items-center justify-center ${
                      filters.petsAllowed === option
                        ? "border-[#f15a29]"
                        : "border-gray-300"
                    }`}
                  >
                    {filters.petsAllowed === option && (
                      <span className="w-2 h-2 rounded-full bg-[#f15a29]"></span>
                    )}
                  </span>
                  <span className="text-sm text-gray-700">
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}  
        </div>
      )}
    </div>
  )
}

