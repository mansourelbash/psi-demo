import { TypographyH2 } from "@/components/ui/typography"
import { UnitModel } from "@/types/Unit"
import dynamic from "next/dynamic"
import { ComponentProps, ComponentType } from "react"

type Props = {
  unit: UnitModel
}
export const AmenitiesSection = ({ unit }: Props) => {
  return (
    <div className="space-y-7 max-w-[750px]">
      <TypographyH2 className="font-medium">Key Amenities</TypographyH2>
      <div className="grid grid-cols-2 gap-x-28 gap-y-3.5">
        {unit.amenities.map((amenitie, index) => {
          const Icon: ComponentType<ComponentProps<"svg">> = dynamic(() =>
            import(`@/assets/icons/amenities/${amenitie.id}.svg`).catch(
              () => import(`@/assets/icons/logo.svg`)
            )
          )
          return (
            <div key={index} className="flex gap-3 items-center">
              <Icon className="size-6 text-primary" />
              <h3 className="text-lg font-medium">{amenitie.name}</h3>
            </div>
          )
        })}
      </div>
    </div>
  )
}
