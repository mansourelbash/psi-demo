"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { MultiCheckboxSelectProps } from "@/types/MultiCheckboxSelect";

const MultiCheckboxSelect: React.FC<MultiCheckboxSelectProps> = ({
  options,
  selectedOptions,
  onToggleOption,
  title = "Select Option",
  isMulti = false,
  variant = "default",
  additionalOptions,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelection = (optionId: string) => {
    if (isMulti) {
      onToggleOption(optionId);
    } else {
      onToggleOption(optionId); // For single select, toggle directly
      setIsOpen(false); // Close the dropdown on single selection
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "outlined":
        return "border border-[#2C2D65] text-[#2C2D65]";
      case "filled":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-[#2C2D65] text-white";
    }
  };

  const isSelected = (optionId: string) => {
    return isMulti
      ? (selectedOptions as string[]).includes(optionId)
      : selectedOptions === optionId;
  };

  const displayText = () => {
    if (isMulti) {
      if ((selectedOptions as string[]).length > 0) {
        const selectedNames = (selectedOptions as string[])
          .map(
            (selectedId) =>
              options.find((opt) => opt.id === selectedId)?.name
          )
          .filter(Boolean)
          .join(", ");
        return selectedNames;
      } else {
        return title;
      }
    } else {
      const selectedOption = options.find(
        (opt) => opt.id === selectedOptions
      );
      return selectedOption ? selectedOption.name : title;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full p-2.5 flex justify-center items-center gap-2 text-center rounded-lg",
          getVariantStyles()
        )}
      >
        <span className="text-lg">{displayText()}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform",
            isOpen && "transform rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="border rounded-b-lg overflow-hidden bg-white absolute mt-1 z-20">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSelection(option.id)}
              className={cn(
                "flex items-center px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors",
                isSelected(option.id) && "bg-[#FFF5F1]"
              )}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded mr-3 flex items-center justify-center",
                  isSelected(option.id) ? "bg-[#F15A22]" : "border"
                )}
              >
                {isSelected(option.id) && <Check className="h-4 w-4 text-white" />}
              </div>

              <span className="text-gray-700 text-lg">{option.name}</span>
            </div>
          ))}
          {additionalOptions && <div className="px-6 py-4">{additionalOptions}</div>}
        </div>
      )}
    </div>
  );
};

export default MultiCheckboxSelect;
