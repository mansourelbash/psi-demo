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
    onToggleOption(optionId);
    if (!isMulti) {
      setIsOpen(false);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "outlined":
        return "border border-gray-400 text-gray-700";
      case "filled":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-[#2A2B5F] text-white";
    }
  };

  const isSelected = (optionId: string) =>
    isMulti
      ? (selectedOptions as string[]).includes(optionId)
      : selectedOptions === optionId;

  const displayText = () => {
    if (isMulti) {
      const selectedCount = (selectedOptions as string[]).length;
      return selectedCount > 0 ? `${selectedCount} selected` : title;
    } else {
      const selectedOption = options.find(
        (opt) => opt.id === selectedOptions
      );
      return selectedOption ? selectedOption.name : title;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full p-4 flex items-center justify-between rounded-t-lg",
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
        <div className="border rounded-b-lg overflow-hidden bg-white">
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
    {isSelected(option.id) && (
      <Check className="h-4 w-4 text-white" />
    )}
  </div>
              
              <span className="text-gray-700 text-lg">{option.name}</span>
            </div>
          ))}
          {additionalOptions && (
            <div className="px-6 py-4">{additionalOptions}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiCheckboxSelect;
