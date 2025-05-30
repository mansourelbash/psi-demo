import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Button } from "../ui/button";
import { Chip } from "../ui/chip";
import {
  EnvelopeSimple,
  Heart,
  MapPin,
  Phone,
  SealCheck,
  ShareFat,
} from "@phosphor-icons/react/dist/ssr";
import { CompareIcon } from "@/components/icons/compare-icon";
import { Separator } from "@/components/ui/separator";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { BaseUnitModel } from "@/types/Unit";
import { FC } from "react";
import SpaceUnitConverter from "./SpaceUnitConverter";
import Link from "next/link";
import { Bath, Bed, Copy } from "lucide-react";
import CurrencyConverter from "./CurrencyConverter";
import moment from "moment";

type UnitCardProps = {
  unit: BaseUnitModel;
  operation: "SALE" | "RENT";
  locale?: string;
  classNames?: string;
  width?: string;
  route_to?: string;
};
export const UnitCard: FC<UnitCardProps> = ({
  unit,
  operation,
  classNames,
  width,
  route_to,
}) => {
  if (!unit) return null;
  const currentDate = moment();
  const handoverDate = unit?.handover_date ? moment(unit.handover_date) : null;
  
  return (
    <div className={`p-2.5 rounded-[18px] border flex flex-col h-full ${width ? width : "w-[410px]"} ${classNames ?? ""}`}>
      <Link href={`${route_to ? route_to : `unit/${operation}/${unit.id}`}`} className="block flex-shrink-0">
        <AspectRatio ratio={1.44 / 1} className="rounded-lg overflow-hidden relative">
          <Image
            src={unit.cover_photo?.at(0)?.preview ?? "/images/hero.png"}
            alt="test"
            fill
          />
          <div className="flex flex-col justify-between h-full relative z-10 pt-5">
            <div className="flex flex-wrap justify-between gap-2 px-3">
              <div className="flex gap-2 w-full sm:w-auto">
                {unit.handover_date && (
                  <Chip
                    variant="flat"
                    color="primary"
                    className="uppercase py-1.5 px-2.5 h-auto rounded-full border-0 font-medium"
                  >
                    {currentDate.diff(handoverDate) > 0 ? "Ready" : "Off Plan"}
                  </Chip>
                )}
                <Chip
                  variant="flat"
                  color="primary-blue"
                  className="uppercase py-1.5 px-2.5 h-auto rounded-full border-0 font-medium"
                >
                  {unit.unit_type?.name}
                </Chip>
              </div>
              <div className="flex gap-2 w-full sm:w-auto justify-start sm:justify-end mt-2 sm:mt-0">
                <Button
                  size="icon"
                  className="rounded-full bg-background size-[29px]"
                  variant="ghost"
                >
                  <ShareFat size={16} />
                </Button>
                <Button
                  size="icon"
                  className="rounded-full bg-background size-[29px]"
                  variant="ghost"
                >
                  <CompareIcon className="size-4" />
                </Button>
                <Button
                  size="icon"
                  className="rounded-full bg-background size-[29px]"
                  variant="ghost"
                >
                  <Heart size={16} />
                </Button>
              </div>
            </div>

            <div className="h-[58px] px-4 pb-2.5 pt-4 flex gap-2 bg-gradient-to-t from-[#2C2D65] to-[rgba(44,45,101,0.05)]">
              <div className="size-[29px] border border-primary overflow-hidden rounded-full relative">
                <Image
                  src={
                    unit.listing_agent?.profile_image?.preview ??
                    "/images/avatar.png"
                  }
                  fill
                  alt=""
                />
              </div>
              <div className="text-xs text-white">
                <div>Listed by</div>
                <div className="font-medium">{unit.listing_agent?.name}</div>
              </div>
            </div>
          </div>
        </AspectRatio>
      </Link>

      <div className="p-5 pt-2.5 mt-auto">
        <Link href={`${route_to ? route_to : `unit/${operation}/${unit.id}`}`} className="block">
          <div className="flex justify-between flex-wrap gap-2">
            <h2 className="text-[22px] leading-[26px] font-medium text-2xl text-primary">
              <CurrencyConverter>
                {unit.selling_price | unit.rent_per_year}
              </CurrencyConverter>
              {operation === "RENT" && " per year"}
            </h2>
            <Chip
              variant="flat"
              className="rounded-full border-0 bg-gradient-to-r from-[#272963] to-[#1169C1] text-white"
            >
              <SealCheck size={13} /> Verified
            </Chip>
          </div>
          <p className="text-lg font-medium mt-3">{unit.title}</p>
          <div className="flex items-center gap-1 text-sm mt-3.5">
            <MapPin size={14.5} />
            <span>
              {[unit.city?.name, unit.community?.name, unit.sub_community?.name]
                .filter(Boolean)
                .join(" | ")}
            </span>
          </div>
          <div className="flex gap-2.5 flex-wrap items-center mt-3 text-sm font-medium">
            <div className="flex gap-2.5 items-center">
              <Bed size={20} />
              <span>{unit.bedrooms}</span>
            </div>
            <div className="flex gap-2.5 items-center">
              <Bath size={20} />
              <span>{unit.bathrooms}</span>
            </div>
            <div className="flex gap-2.5 items-center">
              <Copy size={20} />
              <span>
                <SpaceUnitConverter>
                  {unit.built_up_area_sqft ?? 0}
                </SpaceUnitConverter>
              </span>
            </div>
          </div>
        </Link>

        <Separator className="mt-2.5 mb-3.5" />
        <div className="flex flex-wrap gap-2 w-full">
          <Link href="tel:+97122052888" className="flex-1" passHref>
            <Button
              variant="primary-blue"
              className="font-normal gap-1 h-9 px-0 w-full"
            >
              <Phone size={14} /> Call
            </Button>
          </Link>
          <Link href="mailto:info@psinv.net" className="flex-1" passHref>
            <Button
              variant="primary-blue"
              className="font-normal gap-1 h-9 px-0 rounded-md w-full"
            >
              <EnvelopeSimple size={14} /> Email
            </Button>
          </Link>
          <Link href="https://wa.me/+97122052888" className="flex-[2]" passHref>
            <Button
              variant="primary-green"
              className="font-normal h-9 bg-white w-full border border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-white"
            >
              <WhatsAppIcon /> WhatsApp
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};