"use client";

import { useState, useEffect, useCallback, RefObject, useRef } from "react";
import { MapPin, SlidersHorizontal } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddtionalFilter from "./AddtionalFilter";
import { Map } from "mapbox-gl";
import { getFilterationSearchData } from "@/services/map-search";
import { useAtom, useSetAtom } from "jotai";
import {
  activePointClickedAtom,
  mapItemsAtom,
  unitsItemAtom,
} from "./MapSearch";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

interface SearchMapProps {
  className?: string;
  mapContainerRef: RefObject<Map | null>;
}

interface Suggestion {
  title: string;
  subtitle?: string;
  city_id?: string;
  location?: {
    lng: number;
    lat: number;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SearchMap({
  className = "",
  mapContainerRef,
}: SearchMapProps) {
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [completionStatus, setCompletionStatus] = useState("ANY");
  const [cityId, setCityId] = useState("");
  const [propertyType, setPropertyType] = useState<number | null>(null);
  const [developer, setDeveloper] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const setMapItems = useSetAtom(mapItemsAtom);
  const [, setActivePointClicked] = useAtom(activePointClickedAtom);

  const setUnitItems = useSetAtom(unitsItemAtom);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const propertyTypes = {
    null: "Any",
    411: "Apartment",
    413: "Villa",
    422: "Townhouse",
    416: "Retail",
    419: "Plot",
    426: "Penthouse",
    21966: "Mixed Used Building",
    421: "Mixed Used Plots",
    62114: "Duplex",
    21965: "Compound",
    21963: "Building",
    428: "Farm",
    63599: "Hotel Apartment",
    62060: "Mansion",
    21968: "Residential Floor",
    63563: "Terraced Apartment",
    412: "Furnished Apartment",
    70022: "Simplex",
    417: "Office",
    70024: "Shop",
    414: "Warehouse",
    70025: "Showroom",
    21964: "Commercial Building",
    418: "Commercial Villa",
    424: "Commercial Floor",
    427: "Common Area",
    429: "Storage",
    425: "Business Center",
    420: "Commercial Plot",
  };

  const handleCompletionStatusChange = (value: string) => {
    setCompletionStatus(value.toUpperCase());
  };

  const handlePropertyTypeChange = (value: string) => {
    const selectedId = Number(value);
    setPropertyType(selectedId);
    console.log("Property Type:", selectedId);
  };

  const handleDeveloperChange = (value: string) => {
    setDeveloper(value);
    console.log("Developer:", value);
  };

  const handlePriceRangeChange = (value: string) => {
    const parsedValue = value.split(",").map(Number) as [number, number];

    if (
      parsedValue.length === 2 &&
      !isNaN(parsedValue[0]) &&
      !isNaN(parsedValue[1])
    ) {
      setPriceRange(parsedValue);
    } else {
      console.error("Invalid price range format:", value);
    }

    console.log("Price Range:", parsedValue);
  };

  const debounce = (func: () => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func();
      }, delay);
    };
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
  }, [location, propertyType, developer]);

  const handleSelect = (item: Suggestion) => {
    if (item?.city_id) {
      setCityId(item.city_id);
    } else {
      if (!location) {
        setCityId("");
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
        setCityId("");
      }
      const newData = await getFilterationSearchData({
        completionStatus,
        cityId,
        propertyType,
        priceRange: [priceRange[0], priceRange[1]],
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
      setCityId("");
    } else {
      fetchSuggestions();
    }
  };

  return (
    <div className={`w-[95%] mx-auto bg-white rounded-lg ${className}`}>
      <div className="flex flex-col md:flex-row items-center gap-2 p-2">
        <div className="relative w-full md:w-auto md:flex-1 border-r">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <MapPin size={18} />
          </div>
          <Input
            className="pl-10 h-12 border-none border-r border-[#ECECEC] rounded-none focus:ring-0 focus-visible:ring-0 z-60 relative"
            placeholder="Search by City, Community, Tower"
            value={location}
            onChange={handleLocationChange}
          />
          {suggestions && suggestions?.length > 0 && (
            <div
              className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 rounded-md shadow-lg z-10"
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
                    onClick={() => {handleSelect(suggestion)
                      setSuggestions([]); 
                    }

                    }
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 w-full md:w-auto custom-shadow-button">
          <Select
            value={completionStatus}
            onValueChange={handleCompletionStatusChange}
          >
            <SelectTrigger className="h-12 border-0 focus:ring-0 min-w-[180px] shadow-none border-r border-[#ECECEC] rounded-none">
              <SelectValue>
                {completionStatus === "READY"
                  ? "Ready"
                  : completionStatus === "OFFPLAN"
                  ? "Off Plan"
                  : "Any"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="offplan">Off Plan</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={handlePropertyTypeChange}>
            <SelectTrigger className="h-12 border-0 focus:ring-0 min-w-[180px] shadow-none border-r border-[#ECECEC] rounded-none">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(propertyTypes)
                .sort(([, valueA], [, valueB]) => {
                  if (valueA === "Any") return -1;
                  if (valueB === "Any") return 1;
                  return valueA.localeCompare(valueB);
                })
                .map(([id, name]) => (
                  <SelectItem key={id} value={id}>
                    {name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

         
          <Select value={developer} onValueChange={handleDeveloperChange}>
            <SelectTrigger className="h-12 border-0 focus:ring-0 min-w-[180px] shadow-none border-r border-[#ECECEC] rounded-none">
              <SelectValue placeholder="Developer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="emaar">Emaar</SelectItem>
              <SelectItem value="damac">Damac</SelectItem>
              <SelectItem value="nakheel">Nakheel</SelectItem>
              <SelectItem value="meraas">Meraas</SelectItem>
            </SelectContent>
          </Select>

         
          <Select
            value={`${priceRange[0]}-${priceRange[1]}`}
            onValueChange={handlePriceRangeChange}
          >
            <SelectTrigger className="h-12 border-0 focus:ring-0 min-w-[180px] shadow-none border-r border-[#ECECEC] rounded-none">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={`${priceRange[0]}-${priceRange[1]}`}>
                ${priceRange[0].toLocaleString()} - $
                {priceRange[1].toLocaleString()}
              </SelectItem>
              <SliderPrice
                priceRange={priceRange}
                handlePriceRangeChange={handlePriceRangeChange}
              />
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 border-0"
              >
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1200px]">
              <DialogHeader>
                <DialogTitle>Additional Filters</DialogTitle>
              </DialogHeader>
              <AddtionalFilter setIsOpen={setIsOpen} />
            </DialogContent>
          </Dialog>

          <Button
            className="h-12 w-full md:w-auto bg-[#2a2f5a] hover:bg-[#22254a] text-white px-10"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
