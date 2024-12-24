import {
  Info,
  InfoDataContainer,
  InfoDesc,
  InfoIconContainer,
  InfoTitle,
} from "@/components/app/Info"
import { BathIcon } from "@/components/icons/bath-icon"
import { BedSideIcon } from "@/components/icons/bed-icon"
import { CityIcon } from "@/components/icons/city-icon"
import { DeveloperIcon } from "@/components/icons/developer-icon"
import { RentIcon } from "@/components/icons/rent-icon"
import { SaleIcon } from "@/components/icons/sale-icon"
import { SizeIcon } from "@/components/icons/size-icon"
import { ProjectSummaryModel } from "@/types/Property"
import { OperationType, UnitModel } from "@/types/Unit"
import { MapPin } from "@phosphor-icons/react/dist/ssr"

type Props = {
  unit: UnitModel
  property: ProjectSummaryModel
}
export const DetailsSection = ({ unit, property }: Props) => {
  return (
    <>
      <h1 className="text-[32px] font-medium">{unit.title}</h1>
      <div className="flex gap-2 items-center text-lg leading-tight font-medium mt-5">
        <MapPin size={20} />
        <span>{`Apartment for ${unit.operation_type?.name} in ${unit.community.name}, ${unit.community.name}, ${unit.city.name}`}</span>
      </div>
      <div className="text-primary text-[44px] leading-tight font-medium mt-[44px]">
        {new Intl.NumberFormat().format(unit.selling_price)}{" "}
        {/* {unit.selling_price}{" "} */}
        <span className="text-[32px] font-normal">AED</span>
      </div>
      <div className="grid grid-cols-3 gap-[20px] mt-[40px]">
        <Info>
          <InfoIconContainer>
            <BedSideIcon className="size-6" />
          </InfoIconContainer>
          <InfoDataContainer>
            <InfoTitle>Bedrooms</InfoTitle>
            <InfoDesc>{unit.bedrooms} Beds</InfoDesc>
          </InfoDataContainer>
        </Info>
        <Info>
          <InfoIconContainer>
            <BathIcon className="size-6" />
          </InfoIconContainer>
          <InfoDataContainer>
            <InfoTitle>Bathrooms</InfoTitle>
            <InfoDesc>{unit.bathrooms} Baths</InfoDesc>
          </InfoDataContainer>
        </Info>
        <Info>
          <InfoIconContainer>
            <CityIcon className="size-6" />
          </InfoIconContainer>
          <InfoDataContainer>
            <InfoTitle>Type</InfoTitle>
            <InfoDesc>{unit.unit_type?.name}</InfoDesc>
          </InfoDataContainer>
        </Info>
        <Info>
          <InfoIconContainer>
            <SizeIcon className="size-6" />
          </InfoIconContainer>
          <InfoDataContainer>
            <InfoTitle>Size</InfoTitle>
            <InfoDesc>{unit.total_area_sqft ?? "---"}</InfoDesc>
          </InfoDataContainer>
        </Info>
        <Info>
          <InfoIconContainer>
            {unit.operation_type?.id == OperationType.Sale && (
              <SaleIcon className="size-6" />
            )}
            {unit.operation_type?.id == OperationType.Rent && (
              <RentIcon className="size-6" />
            )}
          </InfoIconContainer>
          <InfoDataContainer>
            <InfoTitle>Purpose</InfoTitle>
            <InfoDesc>For {unit.operation_type?.name ?? "---"}</InfoDesc>
          </InfoDataContainer>
        </Info>
        <Info>
          <InfoIconContainer>
            <DeveloperIcon className="size-6" />
          </InfoIconContainer>
          <InfoDataContainer>
            <InfoTitle>Developer</InfoTitle>
            <InfoDesc>{property.developer_name ?? "---"}</InfoDesc>
          </InfoDataContainer>
        </Info>
      </div>
    </>
  )
}
