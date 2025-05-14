
export type Agent = {
  id: string | number;
  name: string;
  profile_image?: {
    preview: string;
  };
  referenceNumber: string;
  languages: { name: string }[] | undefined;

  specialties: string[];
  services: string[];
  areaOfSpecialist: string[];
  overview?: string;
  title?: {
    name: string;
  };
  phone_number?: string;
  media?: {
    preview: string;
  }[];
  years_of_experience?: number
  whatsapp_number?: number
  branch?: {
    name: string
  }
  email?: string
};


export interface AgentCardProps {
  agent: Agent;
}

export interface Location {
  title: string;
  location: string;
  image?: string;
  types: string[];
  city: string;
}


// interface Coordinates {
//   lat: number;
//   lng: number;
// }
export type LocationType = {
  name: string;
  title?: string;
  media?: { preview: string }[];
  location?: {
    lat?: number;
    lng?: number;
  };
  image?: string;
  types?: string[];
  city?: {
    name?: string;
  }
  unit_types?: {
    name?: string;
    id?: number | string;
  }[];
};

export interface ReviewCardProps {
  text: string;
}

export interface AreaCardProps {
  index: number;
  location: LocationType;
  key?: number;
  media?: {
    preview: string;
  }[];
  name?: string;
  unit_types?: {
    name?: string;
    id?: number;
  }[];
  city?: {
    name?: string;
  };
}
