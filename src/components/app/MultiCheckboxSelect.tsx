"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { MultiCheckboxSelectProps, OptionGroup } from "@/types/MultiCheckboxSelect";

const MultiCheckboxSelect: React.FC<MultiCheckboxSelectProps> = ({
  options,
  selectedOptions,
  onToggleOption,
  isMulti = false,
  variant = "default",
  additionalOptions,
  groups = [],
  placeholder = "Select...",
  textAlign = "center",
  styles,
  isOpen,
  onToggle,
  ref,
}) => {

  const handleSelection = (optionId: string) => {
    console.log("Selected option:", optionId);
    if (isMulti) {
      onToggleOption(optionId);
    } else {
      onToggleOption(optionId);
      if (onToggle) {
        onToggle();
      }
    }
  };

  const handleGroupSelection = (group: OptionGroup) => {
    console.log(group,'group')
    const groupOptionIds = group.options.map((opt) => opt.id);
    const allSelected = groupOptionIds.every((id) =>
      (selectedOptions as string[]).includes(id)
    );

    if (allSelected) {
      groupOptionIds.forEach((id) => onToggleOption(id));
    } else {
      groupOptionIds.forEach((id) => {
        if (!(selectedOptions as string[]).includes(id)) {
          onToggleOption(id);
        }
      });
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "shadow-none bg-tranparent  text-[#414042]";
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
        const selectedGroups = groups
          .map((group) => {
            const selectedInGroup = group.options.filter((opt) =>
              (selectedOptions as string[]).includes(opt.id)
            );
            
            if (selectedInGroup.length > 0) {
              return `${group.label} (${selectedInGroup.length})`;
            }
            return null;
          })
          .filter(Boolean); 
  
        const selectedNames = options
          .filter((opt) => (selectedOptions as string[]).includes(opt.id))
          .map((opt) => opt.name);
  
        const allSelected = [...selectedGroups, ...selectedNames];
  
        return allSelected.length > 0 ? allSelected.join(", ") : placeholder;
      } else {
        return placeholder;
      }
    } else {
      const selectedOption = options.find(
        (opt) => opt.id === selectedOptions
      );
      return selectedOption ? selectedOption.name : placeholder;
    }
  };
  
  const alignmentStyles: Record<'left' | 'center' | 'right', string> = {
    left: 'left-class',
    center: 'center-class',
    right: 'right-class',
  };

  return (
    <div className="w-full max-w-md mx-auto relative" >
      <button
        onClick={onToggle}
        className={cn(
          `w-full p-2.5 flex justify-between gap-2 text-center rounded-lg ${styles}`,
          getVariantStyles(),
          alignmentStyles[textAlign]
        )}
      >
        <span className="text-sm">{displayText()}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform text-[#414042]",
            isOpen && "transform rotate-180 text-[#414042]"
          )}
        />
      </button>

      {isOpen && (
        <div ref={ref} className="border rounded-b-lg overflow-hidden bg-white absolute mt-1 z-20 max-h-60 overflow-y-auto">
          {groups && groups.length > 0 &&
            groups.map((group) => (
              <div key={group.label} className="px-4 py-2">
                <div
                  onClick={() => handleGroupSelection(group)}
                  className="flex items-center cursor-pointer font-semibold text-[14px] border-b text-[#414042] hover:bg-gray-100 px-2 py-1 rounded-none"

                >
                  {group.label}
                </div>

                {group.options.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleSelection(option.id)}
                    className={cn(
                      "flex items-center px-1 py-2 cursor-pointer hover:bg-gray-50 transition-colors",
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
                    <span className="text-gray-700 text-sm">{option.name}</span>
                  </div>
                ))}
              </div>
            ))}

          {options && options.length > 0 &&
            options.map((option) => (
              <div
                key={option.id}
                onClick={() => handleSelection(option.id)}
                className={cn(
                  "flex items-center px-2 py-2 cursor-pointer hover:bg-gray-50 transition-colors",
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
                <span className="text-gray-700 text-sm">{option.name}</span>
              </div>
            ))}

          {additionalOptions && <div className="px-6 py-4">{additionalOptions}</div>}
        </div>
      )}
    </div>
  );
};

export default MultiCheckboxSelect;
