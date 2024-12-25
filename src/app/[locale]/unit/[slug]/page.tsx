import { Container } from "@/components/ui/container"
import { getPropertySummary } from "@/services/properties"
import { getUnit } from "@/services/units"
import { GallerySection } from "./gallery-section/GallerySection"
import { Separator } from "@/components/ui/separator"
import { DetailsSection } from "./details-section/DetailsSection"
import { ToolbarSection } from "./toolbar-section/ToolbarSection"
import { DescriptionSection } from "./description-section/DescriptionSection"
import { ProjectSummerySection } from "./project-summery-section/ProjectSummerySection"
import { PropertyOverviewSection } from "./property-overview-section/PropertyOverviewSection"
import { AmenitiesSection } from "./amenities-section/ProjectSummerySection"

export default async function Unit() {
  const unit = await getUnit("SALE", "1934")
  const property = await getPropertySummary(unit.property_id.toString())

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
      <ToolbarSection breadcrumbData={breadcrumbData} />
      <GallerySection unit={unit} />
      <Container className="mt-[70px] grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <DetailsSection unit={unit} property={property} />
          <Separator className="my-10 w-[90%]" />
          <PropertyOverviewSection unit={unit} />
          <Separator className="my-10 w-[90%]" />
          <DescriptionSection unit={unit} />
          <Separator className="my-10 w-[90%]" />
          <ProjectSummerySection property={property} />
          <Separator className="my-10 w-[90%]" />
          <AmenitiesSection unit={unit} />
          <Separator className="my-10 w-[90%]" />
        </div>
        <div className="col-span-3">col 2</div>
      </Container>
    </main>
  )
}
