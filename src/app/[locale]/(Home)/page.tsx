import { Container } from "@/components/ui/container"
import Image from "next/image"
import hero from "../../../../public/images/hero.png"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function Home() {
  return (
    <main className="py-[50px]">
      <Container className="rounded-[20px] overflow-hidden">
        <AspectRatio
          ratio={16 / 7.2}
          className="flex items-center justify-center"
        >
          <Image
            src={hero}
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
    </main>
  )
}
