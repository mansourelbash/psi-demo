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


export interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  url: string
}
  

export interface DeveloperModel {  
  page: number;
  per_page: number;
}