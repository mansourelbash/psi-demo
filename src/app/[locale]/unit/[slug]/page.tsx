import { AppBreadcrumb } from "@/components/app/AppBreadcrumb"
import { CompareIcon } from "@/components/icons/compare-icon"
import { Container } from "@/components/ui/container"
import { getProperty } from "@/services/properties"
import { getUnit } from "@/services/units"
import {
  HeartStraight,
  MapPin,
  ShareNetwork,
} from "@phosphor-icons/react/dist/ssr"
import { GallerySection } from "./gallery-section/GallerySection"
import { BedIcon, BedSideIcon } from "@/components/icons/bed-icon"
import {
  Info,
  InfoDataContainer,
  InfoDesc,
  InfoIconContainer,
  InfoTitle,
} from "@/components/app/Info"
import { BathIcon } from "@/components/icons/bath-icon"
import { CityIcon } from "@/components/icons/city-icon"
import { SizeIcon } from "@/components/icons/size-icon"
import { SaleIcon } from "@/components/icons/sale-icon"
import { OperationType } from "@/types/Unit"
import { RentIcon } from "@/components/icons/rent-icon"
import { DeveloperIcon } from "@/components/icons/developer-icon"
import { Separator } from "@/components/ui/separator"
import { TypographyH2 } from "@/components/ui/typography"
import { PriceLabelIcon } from "@/components/icons/price-label-icon"
import { HouseIcon } from "@/components/icons/house-icon"

export default async function Unit() {
  const unit = await getUnit("SALE", "1933")
  // console.log(unit)
  const property = await getProperty(unit.property_id.toString())

  const breadcrumbData = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: unit.city.name,
      href: `/units/?operation-type=${"SALE"}&city=${unit.city.id}`,
    },
    {
      name: unit.community.name,
      href: `/units/?operation-type=${"SALE"}&city=${unit.city.id}&community=${
        unit.community.id
      }`,
    },
    {
      name: unit.property_name,
      href: `/units/?operation-type=${"SALE"}&city=${unit.city.id}&community=${
        unit.community.id
      }&project=${"test"}`,
    },
  ]

  return (
    <main className="py-[70px]">
      <Container className="flex justify-between items-center gap-2 flex-wrap">
        <AppBreadcrumb data={breadcrumbData} />
        <div className="flex gap-3.5">
          <button className="flex gap-2 items-center text-sm font-medium">
            <div className="size-[40px] border rounded-full flex items-center justify-center">
              <HeartStraight size={20} />
            </div>
            Save
          </button>
          <button className="flex gap-2 items-center text-sm font-medium">
            <div className="size-[40px] border rounded-full flex items-center justify-center">
              <CompareIcon className="size-4" />
            </div>
            Compare
          </button>
          <button className="flex gap-2 items-center text-sm font-medium">
            <div className="size-[40px] border rounded-full flex items-center justify-center">
              <ShareNetwork size={20} />
            </div>
            Share
          </button>
        </div>
      </Container>
      <GallerySection unit={unit} />
      <Container className="mt-[70px] grid grid-cols-12 gap-6">
        <div className="col-span-9">
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
                <InfoDesc>{property.developer?.name ?? "---"}</InfoDesc>
              </InfoDataContainer>
            </Info>
          </div>
          <Separator className="my-10 w-[90%]" />
          <div className="space-y-7">
            <TypographyH2 className="font-medium">
              Property Overview
            </TypographyH2>
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
            </div>
          </div>
        </div>
        <div className="col-span-3">col 2</div>
      </Container>
    </main>
  )
}
