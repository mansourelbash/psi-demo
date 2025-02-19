import { ImageModel, Positions } from "./Shared";

export interface Banner {
    id: string; // UUID format
    position: Positions; // Assuming fixed value or extend with union type
    url: string;
    unit_id: number;
    unit_operation_type: string;
    property_id: number;
    event_id: string; // UUID
    promotion_id: string; // UUID
    show_on_property_id: number;
    navigate_to: string; // Assuming fixed value or extend with union type
    status: boolean;
    title: string;
    subtitle: string;
    description: string;
    image: ImageModel;
    is_video: boolean;
  }