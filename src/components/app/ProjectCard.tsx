import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import { Button } from "../ui/button"
import { Chip } from "../ui/chip"
import {
  EnvelopeSimple,
  Heart,
  MapPin,
  Phone,
  ShareFat,
} from "@phosphor-icons/react/dist/ssr"
import { CompareIcon } from "@/components/icons/compare-icon"
import { TextHighlight } from "@/components/ui/typography"
import { BedIcon } from "@/components/icons/bed-icon"
import { BoxSizeIcon } from "@/components/icons/box-size-icon"
import { Separator } from "@/components/ui/separator"
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon"

type Props = {}
export const ProjectCard = (props: Props) => {
  return (
    <div className="p-2.5 rounded-[18px] border">
      <AspectRatio
        ratio={1.44 / 1}
        className="rounded-lg overflow-hidden relative"
      >
        <Image src={"/images/hero.png"} alt="test" fill />
        <div className="flex flex-col justify-between h-full relative z-10 pt-5">
          <div className="flex justify-between gap-2 px-3">
            <div className="flex gap-2">
              <Chip
                variant="flat"
                color="primary"
                className="uppercase py-1.5 px-2.5 h-auto rounded-full border-0 font-medium"
              >
                Off Plan
              </Chip>
              <Chip
                variant="flat"
                color="primary-blue"
                className="uppercase py-1.5 px-2.5 h-auto rounded-full border-0 font-medium"
              >
                Apartment
              </Chip>
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
          <div className="h-[58px] px-4 pb-2.5 pt-4 flex gap-2 bg-gradient-to-t from-[#2C2D65] to-[rgba(44,45,101,0.05)]">
            <div className="size-[29px] border border-primary overflow-hidden rounded-full relative">
              <Image src="/images/avatar.png" fill alt="" />
            </div>
            <div className="text-xs text-white">
              <div>Listed by</div>
              <div className="font-medium">Mohammad Abuawad</div>
            </div>
          </div>
        </div>
      </AspectRatio>
      <div className="p-5 pt-2.5">
        <h2 className="text-[22px] leading-[26px] font-medium">
          From <TextHighlight className="text-2xl">4,321,890</TextHighlight> AED
        </h2>
        <p className="text-lg font-medium mt-3">Sea La Vie in Yas Island</p>
        <div className="flex items-center gap-1 text-sm mt-3.5">
          <MapPin size={14.5} />
          <span>Sea La Vie | Yas Island | Abu Shabi</span>
        </div>
        <div className="flex gap-2.5 flex-wrap items-center mt-3 text-sm font-medium">
          <div className="flex gap-2.5 items-center">
            <BedIcon />
            <span>2-6</span>
          </div>
          <div className="flex gap-2.5 items-center">
            <BoxSizeIcon />
            <span>12,643 sq.ft</span>
          </div>
        </div>
        <Separator className="mt-2.5 mb-3.5" />
        <div className="flex flex-wrap gap-2">
          <Button
            variant="primary-blue"
            className="font-normal gap-1 w-[80px] h-9 px-0"
          >
            <Phone size={14} /> Call
          </Button>
          <Button
            variant="primary-blue"
            className="font-normal gap-1 w-[80px] h-9 px-0"
          >
            <EnvelopeSimple size={14} /> Email
          </Button>
          <Button
            variant="outline"
            className="font-normal gap-1 grow h-9 px-0 border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-white"
          >
            <WhatsAppIcon /> WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}

export const ProjectCardFlat = (props: Props) => {
  return (
    <AspectRatio
      ratio={410 / 496}
      className="overflow-hidden relative py-[1.125rem] px-3 rounded-[12px]"
    >
      <Image
        src={"/images/hero.png"}
        alt="test"
        fill
        className="object-cover"
      />
      <div className="bg-gradient-to-b from-primary-dark-blue/35 from-65% to-primary-dark-blue absolute top-0 start-0 size-full"></div>
      <div className="flex flex-col justify-between h-full relative z-10">
        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
            <Chip
              variant="flat"
              color="primary"
              className="uppercase py-1.5 px-2.5 h-auto rounded-full border-0 font-medium"
            >
              Off Plan
            </Chip>
            <Chip
              variant="flat"
              color="primary-blue"
              className="uppercase py-1.5 px-2.5 h-auto rounded-full border-0 font-medium"
            >
              Apartment
            </Chip>
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
        <div className="h-[58px] px-4 pb-2.5 pt-4 flex gap-2">
          <div className="size-[29px] border border-primary overflow-hidden rounded-full relative">
            <Image src="/images/avatar.png" fill alt="" />
          </div>
          <div className="text-xs text-white">
            <div>Listed by</div>
            <div className="font-medium">Mohammad Abuawad</div>
          </div>
        </div>
      </div>
    </AspectRatio>
  )
}
