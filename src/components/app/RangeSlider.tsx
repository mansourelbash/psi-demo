import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PrimitiveAtom, useAtom } from "jotai";
import { Filters, filtersAtom } from "@/atoms/MapFilterAtoms";

interface RangeSliderProps {
  min: number;
  max: number;
  minValue: number | null;
  maxValue: number | null;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  trackColor?: string;
  handleColor?: string;
  buttonClass?: string;
  buttonText?: string;
  onReset?: () => void;
  trackRef: React.RefObject<HTMLDivElement | null>;
  minPlaceholder?: string;
  maxPlaceholder?: string;
  Icon?: React.ElementType;
  height?: string;
  priceRange?: [number | null, number | null];
  propertySize?: [number | null, number | null];
  inputGap?: string;
  render?:string
  atom?: PrimitiveAtom<Filters>;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  trackColor = "bg-gray-300",
  handleColor = "bg-orange-500",
  buttonClass = "text-sm text-blue-500",
  buttonText = "Reset",
  onReset,
  trackRef,
  minPlaceholder = "Min",
  maxPlaceholder = "Max",
  Icon,
  height = "h-24",
  priceRange,
  propertySize,
  inputGap,
  atom
}) => {
  const [leftPosition, setLeftPosition] = useState(
    (((minValue ?? min) - min) / (max - min)) * 100
  );
  const [rightPosition, setRightPosition] = useState(
    (((maxValue ?? max) - min) / (max - min)) * 100
  );
    const store = atom ?? filtersAtom
    const [, setFilters] = useAtom(store);

  useEffect(() => {
    if (
      priceRange &&
      (minValue !== priceRange[0] || maxValue !== priceRange[1])
    ) {
      setFilters((prev) => ({
        ...prev,
        priceRange: [minValue ?? min, maxValue ?? max],
      }));
    }
  }, [minValue, maxValue, priceRange, setFilters, min, max]);

  useEffect(() => {
    if (
      propertySize &&
      (minValue !== propertySize[0] || maxValue !== propertySize[1])
    ) {
      setFilters((prev) => ({
        ...prev,
        propertySize: [minValue ?? min, maxValue ?? max],
      }));
    }
  }, [minValue, maxValue, propertySize, setFilters, min, max]);

  useEffect(() => {
    setLeftPosition((((minValue ?? min) - min) / (max - min)) * 100);
    setRightPosition((((maxValue ?? max) - min) / (max - min)) * 100);
  }, [minValue, maxValue, min, max]);

  const handleMouseDown =
    (side: "left" | "right") => (event: React.MouseEvent) => {
      event.preventDefault();

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (trackRef.current) {
          const rect = trackRef.current.getBoundingClientRect();
          const percentage =
            ((moveEvent.clientX - rect.left) / rect.width) * 100;
          const newValue = Math.round((percentage / 100) * (max - min) + min);

          if (
            side === "left" &&
            newValue < (maxValue ?? max) &&
            newValue >= min
          ) {
            onMinChange(newValue);
            setLeftPosition(percentage);
          } else if (
            side === "right" &&
            newValue > (minValue ?? min) &&
            newValue <= max
          ) {
            onMaxChange(newValue);
            setRightPosition(percentage);
          }
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(
      min,
      Math.min(Number(e.target.value), maxValue ?? max)
    );
    onMinChange(value);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      max,
      Math.max(Number(e.target.value), minValue ?? min)
    );
    onMaxChange(value);
  };

  return (
    <div className="space-y-4">
      <div className={`${height} relative`}>
        {Icon && <Icon />}
        <div
          ref={trackRef}
          className={`absolute bottom-0 left-0 right-0 h-1 ${trackColor}`}
        >
          <div
            className={`absolute h-full ${handleColor}`}
            style={{
              left: `${leftPosition}%`,
              width: `${rightPosition - leftPosition}%`,
            }}
          />
          <div
            className={`absolute w-4 h-4 ${handleColor} rounded-full -ml-2 -mt-1.5 cursor-pointer`}
            style={{ left: `${leftPosition}%` }}
            onMouseDown={handleMouseDown("left")}
          />
          <div
            className={`absolute w-4 h-4 ${handleColor} rounded-full -ml-2 -mt-1.5 cursor-pointer`}
            style={{ left: `${rightPosition}%` }}
            onMouseDown={handleMouseDown("right")}
          />
        </div>
      </div>

      <div className={`grid grid-cols-2 ${inputGap ?? "gap-10"}`}>
        <Input
          type="number"
          value={minValue ?? ""}
          onChange={handleMinInputChange}
          placeholder={minPlaceholder}
          className="w-full"
        />
        <Input
          type="number"
          value={maxValue ?? ""}
          onChange={handleMaxInputChange}
          placeholder={maxPlaceholder}
          className="w-full"
        />
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="link"
          className={`${buttonClass} no-underline hover:no-underline text-[14px] text-[#E0592A]`}
          onClick={onReset}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default RangeSlider;
