export interface Developer {
  id: number | string;
  name?: string;
  logo?: {
    preview?: string;
  };
  city?: string;
   
  title?: string;
  location?: [
    {
      lat?: string;
      lng?: string;
    }
  ];
  types?: string[];
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
  items?: Developer[]; 
  pages?: number;           
}



export interface ProjectDeveloperModel {
  id: number;
  page?: number;
  per_page?: number;
  [x: string]: number | undefined;
};


export type DeveloperProfileProjectsProps = {
    propertyId: number;
}

export interface DeveloperProfileModel {
  name: string;
  properties_count: number | undefined;
  founded: number;
  logo?: { preview: string };
  phone?: string;
  overview?: string;
}