export interface Developer {
  name: string;
  logo: string;
  city: string;
}

export interface HeroDeveloperProps {
  developers: Developer[];
}

export interface OptionType {
    value: string;
    label: string;
  }