import {
  Info,
  InfoDataContainer,
  InfoDesc,
  InfoTitle,
} from "@/components/app/Info"
import { PriceLabelIcon } from "@/components/icons/price-label-icon"
import { LocationIcon } from "@/components/icons/LocationIcon"
import { TypographyH2 } from "@/components/ui/typography"
import { ProjectSummaryModel } from "@/types/Property"
import { CalendarIcon } from "@/components/icons/calendar-icon"
import { BoxSizeIcon } from "@/components/icons/box-size-icon"
import { HardHatIcon } from "@/components/icons/hard-hat-icon"
import { SecurityCameraIcon } from "@/components/icons/security-camera-icon"

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
          <CalendarIcon className="size-6 text-primary" />
          <InfoDataContainer className="flex gap-[50px] items-center">
            <InfoTitle className="w-[250px] text-lg font-medium">
              Launched date
            </InfoTitle>
            <InfoDesc>{property.launch_date ?? "---"}</InfoDesc>
          </InfoDataContainer>
        </Info>
        <Info>
          <BoxSizeIcon className="size-6 text-primary" />
          <InfoDataContainer className="flex gap-[50px] items-center">
            <InfoTitle className="w-[250px] text-lg font-medium">
              Area Form (sq.ft)
            </InfoTitle>
            <InfoDesc>{`${property.min_total_sqft} to ${property.max_total_sqft}`}</InfoDesc>
          </InfoDataContainer>
        </Info>
        <Info>
          <BoxSizeIcon className="size-6 text-primary" />
          <InfoDataContainer className="flex gap-[50px] items-center">
            <InfoTitle className="w-[250px] text-lg font-medium">
              Handover
            </InfoTitle>
            <InfoDesc>{property.handover_date ?? "---"}</InfoDesc>
          </InfoDataContainer>
        </Info>
        <Info>
          <HardHatIcon className="size-6 text-primary" />
          <InfoDataContainer className="flex gap-[50px] items-center">
            <InfoTitle className="w-[250px] text-lg font-medium">
              Developer
            </InfoTitle>
            <InfoDesc>{property.developer_name ?? "---"}</InfoDesc>
          </InfoDataContainer>
        </Info>
        <Info>
          <SecurityCameraIcon className="size-6 text-primary" />
          <InfoDataContainer className="flex gap-[50px] items-center">
            <InfoTitle className="w-[250px] text-lg font-medium">
              Service Charge
            </InfoTitle>
            <InfoDesc>{property.service_charge ?? "---"}</InfoDesc>
          </InfoDataContainer>
        </Info>
      </div>
    </div>
  )
}
