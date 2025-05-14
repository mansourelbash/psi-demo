import { AppLandmarksMap } from "@/components/app/AppLandmarksMap"
import { TypographyH2 } from "@/components/ui/typography"
import { getLandmarks } from "@/services/properties"
import { UnitModel } from "@/types/Unit"

type Props = {
  unit: UnitModel
}
export const NearbySection = async ({ unit }: Props) => {
  const landmarks = await getLandmarks(unit.property_id.toString())

  

  return (
    <div className="space-y-7 mt-[54px]">
      <TypographyH2 className="font-medium">
        Location and Places Nearby
      </TypographyH2>

      <AppLandmarksMap landmarks={landmarks} itemLocation={unit.location} />
    </div>
  )
}
