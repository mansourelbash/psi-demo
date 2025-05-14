import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Badge } from "../ui/badge/badge";
import { AreaCardProps } from "@/types/agent";

const AreaCard: React.FC<AreaCardProps> = ({ location, index }) => {
  return (
    <Card
      key={index}
      className="group relative h-[430px] overflow-hidden rounded-lg border-0 bg-transparent ml-0 max-w-full"
    >
      <div className="aspect-[4/3] relative h-full w-full overflow-hidden rounded-lg">
        <Image
          src={
            location?.image ?? "/images/locations/location2.png"
          }
          alt={location?.title || "Location Title"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <h3 className="text-xl font-semibold text-white">{location?.name}</h3>
          <div className="flex items-center gap-1 text-white/90">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{location?.city?.name ?? "Dubai"}</span>

          </div>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(location?.unit_types) &&
              location.unit_types.map((type) => (
                <Badge
                  key={type.id}
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white"
                >
                  {type.name}
                </Badge>
              ))}

            {location.unit_types?.map((type) => (
              <Badge
                key={type.id}
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white"
              >
                {type.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AreaCard;
