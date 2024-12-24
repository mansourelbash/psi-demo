import {
  Info,
  InfoDataContainer,
  InfoDesc,
  InfoTitle,
} from "@/components/app/Info"
import { HouseIcon } from "@/components/icons/house-icon"
import { PriceLabelIcon } from "@/components/icons/price-label-icon"
import { LocationIcon } from "@/components/icons/LocationIcon"
import { TypographyH2 } from "@/components/ui/typography"
import { ProjectSummaryModel, PropertyModel } from "@/types/Property"

type Props = {
  property: ProjectSummaryModel
}
export const ProjectSummerySection = ({ property }: Props) => {
  return (
    <div className="space-y-7">
      <TypographyH2 className="font-medium">Project Summery</TypographyH2>
      <div className="space-y-4">
        <Info>
          <LocationIcon className="size-6 text-primary" />
          <InfoDataContainer className="flex gap-[50px] items-center">
            <InfoTitle className="w-[250px] text-lg font-medium">
              Location
            </InfoTitle>
            <InfoDesc>{property.community_name ?? "---"}</InfoDesc>
          </InfoDataContainer>
        </Info>
        <Info>
          <PriceLabelIcon className="size-6 text-primary" />
          <InfoDataContainer className="flex gap-[50px] items-center">
            <InfoTitle className="w-[250px] text-lg font-medium">
              Starting price from
            </InfoTitle>
            <InfoDesc>{property.min_selling_price ?? "---"}</InfoDesc>
          </InfoDataContainer>
        </Info>
        <Info>
          <PriceLabelIcon className="size-6 text-primary" />
          <InfoDataContainer className="flex gap-[50px] items-center">
            <InfoTitle className="w-[250px] text-lg font-medium">
              Launched date
            </InfoTitle>
            <InfoDesc>{property.launch_date ?? "---"}</InfoDesc>
          </InfoDataContainer>
        </Info>
      </div>
    </div>
  )
}
