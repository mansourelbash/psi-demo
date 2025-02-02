import { AppSelect } from "@/components/app/AppSelect"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { MapPin } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"

export const HeroSection = () => {
  return (
    <Container className="rounded-[20px] overflow-hidden">
      <AspectRatio ratio={16 / 7.2} className="flex items-center">
        <Image
          src={"/images/hero.png"}
          alt="Hero"
          fill
          className="object-cover absolute top-0 left-0 -z-10"
        />
        <div className="space-y-12 grow">
          <h1 className="text-[44px] font-bold text-white text-center">
            Find Your Perfect Home in the UAE
          </h1>
          <div className="flex flex-col items-center gap-5">
            <div className="inline-flex rounded-lg overflow-hidden">
              <Button className="rounded-none h-[55px] w-[125px]">Unit</Button>
              <Button
                className="rounded-none h-[55px] w-[125px] bg-white"
                variant="ghost"
              >
                Project
              </Button>
            </div>
            <div className="bg-secondary-white rounded-[24px] max-w-[1307px] w-[95%] py-6 flex items-center justify-center">
              <div className="w-[1100px] space-y-2.5">
                <div className="flex gap-4">
                  <div className="basis-1/4 inline-flex rounded-sm overflow-hidden border">
                    <Button className="rounded-none h-[55px] grow">Buy</Button>
                    <Button
                      className="rounded-none h-[55px] bg-white grow"
                      variant="ghost"
                    >
                      Rent
                    </Button>
                  </div>
                  <div className="basis-1/2 relative h-[55px]">
                    <MapPin
                      size={18}
                      className="absolute start-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    />
                    <Input
                      placeholder="Search by, City, Community..."
                      className="h-full bg-background ps-10"
                    />
                  </div>
                  <div className="basis-1/4 h-[55px]">
                    <AppSelect
                      data={[]}
                      placeholder="Completion Statues"
                      triggerButton={{ className: "!bg-background h-full" }}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="basis-1/4 h-[55px]">
                    <AppSelect
                      data={[]}
                      placeholder="Beds and Baths"
                      triggerButton={{ className: "!bg-background h-full" }}
                    />
                  </div>
                  <div className="basis-1/2 grid grid-cols-2 gap-4">
                    <div className="basis-1/4 h-[55px]">
                      <AppSelect
                        data={[]}
                        placeholder="Beds and Baths"
                        triggerButton={{ className: "!bg-background h-full" }}
                      />
                    </div>
                    <div className="basis-1/4 h-[55px]">
                      <AppSelect
                        data={[]}
                        placeholder="Beds and Baths"
                        triggerButton={{ className: "!bg-background h-full" }}
                      />
                    </div>
                  </div>

                  <div className="basis-1/4 h-[55px]">
                    <AppSelect
                      data={[]}
                      placeholder="Completion Statues"
                      triggerButton={{ className: "!bg-background h-full" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AspectRatio>
    </Container>
  )
}
