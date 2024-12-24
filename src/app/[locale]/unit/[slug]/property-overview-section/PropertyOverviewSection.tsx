import {
  Info,
  InfoDataContainer,
  InfoDesc,
  InfoIconContainer,
  InfoTitle,
} from "@/components/app/Info"
import { CommunityIcon } from "@/components/icons/community-icon"
import { HouseIcon } from "@/components/icons/house-icon"
import { OwnershipIcon } from "@/components/icons/ownership-icon"
import { PriceLabelIcon } from "@/components/icons/price-label-icon"
import { TypographyH2 } from "@/components/ui/typography"
import { UnitModel } from "@/types/Unit"

type Props = {
  unit: UnitModel
}
export const PropertyOverviewSection = ({ unit }: Props) => {
  return (
    <div className="space-y-7">
      <TypographyH2 className="font-medium">Property Overview</TypographyH2>
      <div className="grid grid-cols-3 gap-[20px]">
        <Info>
          <InfoIconContainer>
            <PriceLabelIcon className="size-6" />
          </InfoIconContainer>
          <InfoDataContainer>
            <InfoTitle>Price</InfoTitle>
            <InfoDesc>{unit.selling_price ?? "---"}</InfoDesc>
          </InfoDataContainer>
        </Info>
        <Info>
          <InfoIconContainer>
            <HouseIcon className="size-6" />
          </InfoIconContainer>
          <InfoDataContainer>
            <InfoTitle>Project Name</InfoTitle>
            <InfoDesc>{unit.property_name ?? "---"}</InfoDesc>
          </InfoDataContainer>
        </Info>
        <Info>
          <InfoIconContainer>
            <PriceLabelIcon className="size-6" />
          </InfoIconContainer>
          <InfoDataContainer>
            <InfoTitle>Price per sqft</InfoTitle>
            <InfoDesc>{unit.price_per_sqft ?? "---"}</InfoDesc>
          </InfoDataContainer>
        </Info>
        <Info>
          <InfoIconContainer>
            <OwnershipIcon className="size-6" />
          </InfoIconContainer>
          <InfoDataContainer>
            <InfoTitle>Ownership</InfoTitle>
            <InfoDesc>{unit.ownership?.name ?? "---"}</InfoDesc>
          </InfoDataContainer>
        </Info>
        <Info>
          <InfoIconContainer>
            <CommunityIcon className="size-6" />
          </InfoIconContainer>
          <InfoDataContainer>
            <InfoTitle>Community</InfoTitle>
            <InfoDesc>{unit.ownership?.name ?? "---"}</InfoDesc>
          </InfoDataContainer>
        </Info>
      </div>
    </div>
  )
}
