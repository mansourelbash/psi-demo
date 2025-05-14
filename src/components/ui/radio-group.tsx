"use client";

import * as React from "react";

// Create a context for the RadioGroup
const RadioGroupContext = React.createContext<{
  value: string;
  onChange: (value: string) => void;
}>({
  value: "",
  onChange: () => {},
});

// RadioGroup component
export const RadioGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
  }
>(({ className, defaultValue, value, onValueChange, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");

  const handleValueChange = (newValue: string) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <RadioGroupContext.Provider
      value={{
        value: value || internalValue,
        onChange: handleValueChange,
      }}
    >
      <div
        ref={ref}
        className={`flex flex-col gap-2 ${className}`}
        {...props}
      />
    </RadioGroupContext.Provider>
  );
});

RadioGroup.displayName = "RadioGroup";

// RadioGroupItem component
export const RadioGroupItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ className, value, ...props }, ref) => {
  const { value: contextValue, onChange } = React.useContext(RadioGroupContext);

  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      aria-checked={contextValue === value}
      className={`flex items-center gap-2 ${className}`}
      onClick={() => onChange(value)}
      {...props}
    />
  );
});

RadioGroupItem.displayName = "RadioGroupItem";