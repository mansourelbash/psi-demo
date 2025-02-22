import { RefObject } from "react";

export interface Option {
  id: string;
  name: string;
}
export interface OptionGroup {
  label: string;
  options: Option[];
}

export interface MultiCheckboxSelectProps {
  options: Option[];
  groups?: OptionGroup[];
  selectedOptions: string[] | string;
  onToggleOption: (optionId: string) => void;
  title?: string;
  isMulti?: boolean;
  variant?: "default" | "outlined" | "filled" | "primary";
  additionalOptions?: React.ReactNode;
  placeholder?: string;
  textAlign?: 'left' | 'center' | 'right',
  styles?: string;
  isOpen?: boolean;
  onToggle?: () => void,
  ref?: RefObject<HTMLDivElement>
}