"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import RangeSlider from "../RangeSlider";
import { PriceRangeIcon } from "@/components/icons/priceRangeIcon";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PrimitiveAtom } from "jotai";
import { Filters } from "@/atoms/MapFilterAtoms";


interface SliderPriceProps {
  priceRange: [number, number];
  classNames? :string
  mainFiltersAtom?: PrimitiveAtom<Filters>;
}

export default function SliderPrice({ priceRange, classNames, mainFiltersAtom }: SliderPriceProps) {
  const [minValue, setMinValue] = useState<number>(priceRange[0]);
  const [maxValue, setMaxValue] = useState<number>(priceRange[1]);
  const [isOpen, setIsOpen] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMinValue(priceRange[0]);
    setMaxValue(priceRange[1]);
  }, [priceRange]);

  const handleMinChange = (value: number) => {
    if (value < 0) return;
    setMinValue(value);
  };

  const handleMaxChange = (value: number) => {
    if (value > 5000000) return;
    setMaxValue(value);
  };

  const resetFilters = () => {
    setMinValue(0);
    setMaxValue(5000000);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={`w-full border-[#ECECEC] justify-between h-[48px] text-[#6e6d6e] ${classNames ? `${classNames}` : ''}`}>
          {minValue > 0 && maxValue ? (
            <span>{minValue} - {maxValue}</span>
          ) : (
            "Price Range"
          )}
          {isOpen ? (
            <ChevronUp className="ml-2 w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="ml-2 w-4 h-4 text-gray-600" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[290px] p-4">
        <RangeSlider
          min={0}
          max={5000000}
          minValue={minValue}
          maxValue={maxValue}
          onMinChange={handleMinChange}
          onMaxChange={handleMaxChange}
          trackColor="bg-gray-400"
          handleColor="bg-[#E0592A]"
          buttonClass="text-sm text-red-500 pl-1"
          buttonText="Reset"
          onReset={resetFilters}
          trackRef={trackRef}
          minPlaceholder="From"
          maxPlaceholder="To"
          Icon={PriceRangeIcon}
          priceRange={priceRange}
          atom={mainFiltersAtom}
        />
      </PopoverContent>
    </Popover>
  );
}
