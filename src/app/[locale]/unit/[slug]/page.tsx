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

export default async function Unit() {
  const unit = await getUnit("SALE", "1933")
  // console.log(unit)
  // const property = await getProperty(unit.property_id.toString())

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
      <Container className="mt-5">Images</Container>
      <Container className="mt-[70px] grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <h1 className="text-[32px] font-medium">{unit.title}</h1>
          <div className="flex gap-2 items-center text-lg leading-tight font-medium mt-5">
            <MapPin size={20} />
            <span>{`Apartment for ${unit.operation_type?.name} in ${unit.community.name}, ${unit.community.name}, ${unit.city.name}`}</span>
          </div>
          <div className="text-primary text-[44px] leading-tight font-medium mt-[44px]">
            {unit.selling_price}{" "}
            <span className="text-[32px] font-normal">AED</span>
          </div>
          <div className="grid mt-[40px]">test</div>
        </div>
        <div className="col-span-3">col 2</div>
      </Container>
    </main>
  )
}
