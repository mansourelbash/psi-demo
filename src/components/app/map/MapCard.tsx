import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";
import { Heart, Phone, Bed, Bath, LayoutDashboard, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge/badge";
import { EnvelopeSimple } from "@phosphor-icons/react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { CompareIcon } from "@/components/icons/compare-icon";
import { City, CoverPhoto } from "@/types/mapSearch";
import Link from "next/link";

interface Community {
  name?: string;
}

interface SubCommunity {
  name?: string;
}

interface MapItem {
  id: number;
  name: string;
  city_id?: string | number;
  location: {
    lat: number;
    lng: number;
  };
  units_count: number;
  cover_photo?: CoverPhoto[];
  is_favorite?: boolean;
  title?: string;
  selling_price?: number;
  property_name?: string;
  city?: City;
  community?: Community;
  sub_community?: SubCommunity;
  bedrooms?: number;
  bathrooms?: number;
  unit_type?: { name: string };
  built_up_area_sqft?: number;
}

interface MapCardProps {
  item: MapItem;
}

export const MapCard: React.FC<MapCardProps> = ({ item }) => {
  const handleCall = (event: React.MouseEvent) => {
    event.stopPropagation();
    window.location.href = "tel:+1234567890";
  };

  const handleEmail = (event: React.MouseEvent) => {
    event.stopPropagation();
    window.location.href = "mailto:example@example.com";
  };

  const handleWhatsApp = (event: React.MouseEvent) => {
    event.stopPropagation();
    window.open("https://wa.me/1234567890", "_blank");
  };

  return (
    
      <Card className="max-w-7xl overflow-hidden mb-2 mx-2">
        <div className="grid grid-cols-10 gap-1">
          <div className="relative col-span-10 md:col-span-3">
            <Link href={`unit/SALE/${item.id}`}>
            <Image
              src={item?.cover_photo?.[0].preview ?? "/images/area-01.png"}
              alt="Kitchen interior of Bloom Gardens villa"
              width={600}
              height={400}
              className="w-full h-[300px] md:h-full object-cover"
            />
            </Link>
            <div className="absolute top-2 left-2 flex gap-2">
              <Button
                size="icon"
                className="rounded-full bg-background size-[29px]"
                variant="ghost"
              >
                <Heart
                  className="size-4"
                  fill={item.is_favorite ? "red" : "none"}
                  stroke={item.is_favorite ? "red" : "#414042"}
                />
              </Button>
              <Button
                size="icon"
                className="rounded-full bg-background size-[29px]"
                variant="ghost"
              >
                <CompareIcon className="size-4" />
              </Button>
            </div>
          </div>

          <div className="p-1.5 flex flex-col gap-1 col-span-10 md:col-span-7">
          <Link href={`unit/SALE/${item.id}`}>
            <div className="space-y-[2px]">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-[18px] font-semibold text-[#F15A22]">
                    {item?.selling_price}{" "}
                    <span className="text-[18px]">AED</span>
                  </h2>
                  <h3 className="text-[16px] font-medium">
                    {item?.property_name
                      ? item?.property_name
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join(" ")
                      : ""}{" "}
                  </h3>
                </div>
                <div className="flex gap-[4px]">
                  {item?.unit_type && item?.unit_type?.name && (
                    <Badge className="bg-[#F15A22] hover:bg-[#F15A22]/90 text-[12px] p-[4px]">
                      {item?.unit_type?.name}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span className="text-[12px] font-bold">
                  {[
                    item.city?.name,
                    item.community?.name,
                    item.sub_community?.name,
                  ]
                    .filter(Boolean)
                    .join(" , ")}
                </span>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4 text-gray-600" />
                  <span className="text-[12px]">{item?.bedrooms}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-4 w-4 text-gray-600" />
                  <span className="text-[12px]">{item?.bathrooms || 1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="h-4 w-4 text-gray-600" />
                  <span className="text-[12px]">
                    {item?.built_up_area_sqft} Sqft
                  </span>
                </div>
              </div>
            </div>
          </Link>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="primary-blue"
                className="flex-1 font-normal h-9 px-[5px] text-[12px]"
                onClick={handleCall}
              >
                <Phone size={12} /> Call
              </Button>
              <Button
                variant="primary-blue"
                className="flex-1 font-normal h-9 px-[5px] text-[12px]"
                onClick={handleEmail}
              >
                <EnvelopeSimple size={12} /> Email
              </Button>
              <Button
                variant="outline"
                className="flex-2 font-normal h-9 px-[5px] border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-white text-[12px]"
                onClick={handleWhatsApp}
              >
                <WhatsAppIcon /> WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </Card>
    
  );
};
