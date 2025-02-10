export interface Option {
  id: string;
  name: string;
}

export interface MultiCheckboxSelectProps {
  options: Option[];
  selectedOptions: string | string[];
  onToggleOption: (optionId: string) => void;
  title?: string;
  isMulti?: boolean;
  variant?: "default" | "outlined" | "filled";
  additionalOptions?: React.ReactNode;
}