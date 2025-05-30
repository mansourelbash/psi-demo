"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Button } from "../ui/button";
import { Chip } from "../ui/chip";
import {
  EnvelopeSimple,
  Heart,
  MapPin,
  Phone,
  ShareFat,
} from "@phosphor-icons/react/dist/ssr";
import { CompareIcon } from "@/components/icons/compare-icon";
import { TextHighlight } from "@/components/ui/typography";
import { BedIcon } from "@/components/icons/bed-icon";
import { BoxSizeIcon } from "@/components/icons/box-size-icon";
import { Separator } from "@/components/ui/separator";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { PropertyListModel } from "@/types/Property";
import { FC, useState } from "react";
import SpaceUnitConverter from "./SpaceUnitConverter";
import CurrencyConverter from "./CurrencyConverter";
import ShareModal from "./ShareModal";
import Link from "next/link";
import { useAtom } from "jotai";
import { settingsAtom } from "@/atoms/settingsAtoms";
import { CityIds } from "@/types/Shared";
import { useRouter } from "next/navigation";
import moment from "moment";

export type ProjectCardProps = {
  project?: PropertyListModel;
  useResponsive?: boolean;
  className?: string;
  index?: number;
  location?: Location;
};
export const ProjectCard: FC<ProjectCardProps> = ({
  project,
  useResponsive,
  className,
}) => {
  const [settings] = useAtom(settingsAtom);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const currentDate = moment();
  const handoverDate = project?.handover_date
    ? moment(project.handover_date)
    : null;

  if (!project) {
    return null;
  }
  return (
    <div
      className={`p-2.5 rounded-[18px] xs:mx-5px border hover:cursor-pointer ${
        useResponsive ? "col" : "w-[410px]"
      } ${className || ""} `}
      onClick={() =>
        router.push(
          `/${settings.locale}/${CityIds[settings.city]}/project/${project.id}`
        )
      }
    >
      <AspectRatio
        ratio={1.44 / 1}
        className="rounded-lg overflow-hidden relative"
      >
        {project ? (
          <Image
            src={
              (Array.isArray(project.cover_photo) &&
                project.cover_photo[0]?.preview) ||
              project.cover_photo?.preview ||
              "/images/hero.png"
            }
            alt="test"
            fill
            className="object-cover"
          />
        ) : (
          <div>Loading...</div>
        )}
        <div className="flex flex-col justify-between h-full relative z-10 pt-5">
          <div className="flex justify-between gap-2 px-3">
            <div className="flex gap-2">
              {project.handover_date && (
                <Chip
                  variant="flat"
                  color="primary"
                  className="uppercase py-1.5 px-2.5 h-auto rounded-full border-0 font-medium"
                >
                  {currentDate.diff(handoverDate) > 0 ? "Ready" : "Off Plan"}
                </Chip>
              )}
              {project.unit_types?.map((type) => (
                <Chip
                  key={type.id}
                  variant="flat"
                  color="primary-blue"
                  className="uppercase py-1.5 px-2.5 h-auto rounded-full border-0 font-medium"
                >
                  {type.name}
                </Chip>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                size="icon"
                className="rounded-full bg-background size-[29px]"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(true);
                }}
              >
                <ShareFat size={16} />
              </Button>
              <ShareModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                url="Https://Psinv.Net/En/Developer/Aldar-Properties-Pjsc"
              />
              <Button
                size="icon"
                className="rounded-full bg-background size-[29px]"
                variant="ghost"
                onClick={(e) => e.stopPropagation()}
              >
                <CompareIcon className="size-4" />
              </Button>
              <Button
                size="icon"
                className="rounded-full bg-background size-[29px]"
                variant="ghost"
                onClick={(e) => e.stopPropagation()}
              >
                <Heart size={16} />
              </Button>
            </div>
          </div>
          {/* <div className='h-[58px] px-4 pb-2.5 pt-4 flex gap-2 bg-gradient-to-t from-[#2C2D65] to-[rgba(44,45,101,0.05)]'>
            <div className='size-[29px] border border-primary overflow-hidden rounded-full relative'>
              <Image src='/images/avatar.png' fill alt='' />
            </div>
            <div className='text-xs text-white'>
              <div>Listed by</div>
              <div className='font-medium'>Mohammad Abuawad</div>
            </div>
          </div> */}
        </div>
      </AspectRatio>
      <div className="p-5 pt-2.5">
        <h2 className="text-[22px] leading-[26px] font-medium">
          From{" "}
          <TextHighlight className="text-2xl">
            <CurrencyConverter>{project?.min_selling_price}</CurrencyConverter>
          </TextHighlight>{" "}
          {/* AED */}
        </h2>
        <p className="text-lg font-medium mt-3">{project?.name}</p>
        <div className="flex items-center gap-1 text-sm mt-3.5">
          <MapPin size={14.5} />
          <span>
            {[
              project?.city?.name,
              project?.community?.name,
              project?.sub_community?.name,
            ]
              .filter(Boolean)
              .join(" | ")}
          </span>
        </div>
        <div className="flex gap-2.5 flex-wrap items-center mt-3 text-sm font-medium">
          <div className="flex gap-2.5 items-center">
            <BedIcon />
            <span>
              {project?.min_bedrooms}-{project?.max_bedrooms}
            </span>
          </div>
          <div className="flex gap-2.5 items-center">
            <BoxSizeIcon />
            <span>
              <SpaceUnitConverter>
                {project?.min_total_sqft ?? 0}
              </SpaceUnitConverter>
            </span>
          </div>
        </div>
        <Separator className="mt-2.5 mb-3.5" />
        <div className="flex flex-wrap gap-2">
          <Link href="tel:+1234567890" passHref>
            <Button
              variant="primary-blue"
              className="font-normal gap-1 w-[80px] h-9 px-0"
              onClick={(e) => e.stopPropagation()}
            >
              <Phone size={14} /> Call
            </Button>
          </Link>

          <Link href="mailto:example@example.com" passHref>
            <Button
              variant="primary-blue"
              className="font-normal gap-1 w-[80px] h-9 px-0"
              onClick={(e) => e.stopPropagation()}
            >
              <EnvelopeSimple size={14} /> Email
            </Button>
          </Link>

          <Button
            variant="outline"
            className="font-normal gap-1 grow h-9 px-0 border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-white"
            onClick={() =>
              window.open(
                "https://wa.me/1234567890",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <WhatsAppIcon /> WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};
export const ProjectCardFlat: FC<ProjectCardProps> = ({ project }) => {
  if (!project) {
    return null;
  }
  const currentDate = moment();
  const handoverDate = moment(project?.handover_date);
  return (
    <div className="w-[410px]">
      <AspectRatio
        ratio={410 / 496}
        className="overflow-hidden relative py-[1.125rem] px-3 rounded-[12px] @container"
      >
        <Image
          src={project?.cover_photo?.preview ?? "/images/hero.png"}
          alt="test"
          fill
          className="object-cover"
        />
        <div className="bg-gradient-to-b from-primary-dark-blue/35 from-65% to-primary-dark-blue absolute top-0 start-0 size-full"></div>
        <div className="flex flex-col justify-between h-full relative z-10">
          <div className="flex justify-between gap-2">
            <div className="flex gap-2">
              {project?.handover_date && (
                <Chip
                  variant="flat"
                  color="primary"
                  className="uppercase py-1.5 px-2.5 h-auto rounded-full border-0 font-medium"
                >
                  {currentDate.diff(handoverDate) > 0 ? "Ready" : "Off Plan"}
                </Chip>
              )}
              {project?.unit_types?.map((type) => (
                <Chip
                  key={type.id}
                  variant="flat"
                  color="primary-blue"
                  className="uppercase py-1.5 px-2.5 h-auto rounded-full border-0 font-medium"
                >
                  {type.name}
                </Chip>
              ))}
            </div>
            <div className="flex gap-2">
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
          <div className="flex flex-col gap-4 text-white">
            <div className="flex flex-col gap-2.5">
              <h3 className="text-3xl font-medium">The Source</h3>
              <div className="flex items-center gap-1 text-sm font-medium">
                <MapPin size={14.5} />
                <span>
                  {" "}
                  {[
                    project?.city?.name,
                    project?.community?.name,
                    project?.sub_community?.name,
                  ]
                    .filter(Boolean)
                    .join(" | ")}
                </span>
              </div>
              <span className="font-light">
                From{" "}
                <span className="text-2xl font-medium">
                  <CurrencyConverter className="text-sm font-medium">
                    {project?.min_selling_price}
                  </CurrencyConverter>
                </span>{" "}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 flex-wrap">
              <Button
                className="gap-1 text-lg font-normal bg-white"
                variant="secondary"
              >
                <Phone size={17} />{" "}
                <span className="hidden @[300px]:flex">Call</span>
              </Button>
              <Button
                className="gap-1 text-lg font-normal bg-white"
                variant="secondary"
              >
                <WhatsAppIcon className="size-[17px]" />{" "}
                <span className="hidden @[300px]:flex">WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </AspectRatio>
    </div>
  );
};
