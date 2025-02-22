"use client"

import { TypographyH2 } from "@/components/ui/typography"
import { UnitModel } from "@/types/Unit"
import Image from "next/image"

type Props = {
  unit: UnitModel
}
export const FloorSection = ({ unit }: Props) => {
  const floorPlan = unit.media?.find((media) =>
    ["21769", "21771"].includes(media.category.id.toString())
  )

  return (
    <>
      {floorPlan?.url && (
        <div className="space-y-7">
          <TypographyH2 className="font-medium">Floor Plan</TypographyH2>
          <div className="bg-secondary-white rounded-[21px] p-20 flex items-center">
            <Image
              src={floorPlan.url.preview}
              alt={`${unit.title} - Floor Plan`}
              width={600}
              height={600}
            />
          </div>
        </div>
      )}
    </>
  )
}
