export type Agent = {
    id: string
    name: string
    image: string
    referenceNumber: string
    languages: string[]
    specialties: string[]
    services: string[]
    areaOfSpecialist: string[]
}

export interface AgentCardProps {
  agent: Agent
}

export interface Location {
  title: string
  location: string
  image?: string
  types: string[]
  city: string
}

export interface ReviewCardProps {
  text: string;
}

export interface AreaCardProps {
    index: number
    location: Location
    key?: number
  }