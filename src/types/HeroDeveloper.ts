import { SetStateAction } from "jotai";
import { Key } from "readline";

export interface Developer {
  [x: string]: Key | null | undefined;
  name: string;
  logo: {
    preview: string;
  };
  city?: string;
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
  [x: string]: Developer[];  
  page: number;
  per_page: number;
}

export interface ProjectDeveloperModel {
  [x: string]: SetStateAction<never[]>;
  id: number;
  page?: number;
  per_page?: number;
};

export type DeveloperProfileProjectsProps = {
    propertyId: number;
}

export interface DeveloperProfileModel {
  name: string;
  properties: number | undefined;
  founded: number;
  logo?: { preview: string };
}