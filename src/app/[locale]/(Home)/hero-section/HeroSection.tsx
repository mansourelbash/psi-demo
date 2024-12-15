import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Container } from "@/components/ui/container"
import Image from "next/image"

type Props = {}
export const HeroSection = (props: Props) => {
  return (
    <Container className="rounded-[20px] overflow-hidden">
      <AspectRatio
        ratio={16 / 7.2}
        className="flex items-center justify-center"
      >
        <Image
          src={"/images/hero.png"}
          alt="Hero"
          fill
          className="object-cover absolute top-0 left-0 -z-10"
        />
        <div>
          <h1 className="text-[44px] font-bold text-white">
            Find Your Perfect Home in the UAE
          </h1>
          <div className="space-y-5">
            <div></div>
          </div>
        </div>
      </AspectRatio>
    </Container>
  )
}
