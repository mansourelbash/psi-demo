import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  ArrowRight,
  FacebookLogo,
  GooglePlayLogo,
  InstagramLogo,
  LinkedinLogo,
  SnapchatLogo,
  TiktokLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="bg-secondary-white py-[30px] space-y-20 max-w-full">
      <Container>
        <div className="flex justify-between gap-2 flex-wrap">
          <Image src="/logo.svg" width={84} height={74} alt="" />
          <div className="flex gap-5 items-center">
            <span className="text-lg font-medium">Follow Us</span>
            <div className="flex gap-2.5">
              <LinkedinLogo size={22} />
              <InstagramLogo size={22} />
              <FacebookLogo size={22} />
              <YoutubeLogo size={22} />
              <SnapchatLogo size={22} />
              <TiktokLogo size={22} />
            </div>
          </div>
        </div>
        <Separator className="mt-[30px]" />
      </Container>
      <Container className="flex justify-between gap-12 flex-col md:flex-row"> {/* Adjusted for responsiveness */}
        <div className="max-w-[370px] space-y-11">
          <div className="space-y-6">
            <h4>Property Shop Investment L.L.C</h4>
            <div>
              <p>Office No. 4410 & 4411</p>
              <p>Addax Tower Level 44</p>
              <p>Al Reem Island, City of Lights</p>
              <p>Abu Dhabi, United Arab Emirates</p>
            </div>
          </div>
          <div className="space-y-5">
            <h4>Subscribe</h4>
            <div>
              <div className="flex gap-1">
                <Input
                  placeholder="Your e-mail"
                  className="bg-transparent border-0 px-0 h-[42px]"
                />
                <Button className="rounded-full w-[117px] h-[42px] font-normal gap-1.5">
                  Send <ArrowRight size={14} />
                </Button>
              </div>
              <Separator className="bg-primary mt-3 mb-0.5" />
              <p className="text-sm text-primary">
                Subscribe to our newsletter to receive our weekly feed.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between grow flex-col sm:flex-row"> {/* Adjusted for responsiveness */}
          <div className="space-y-8">
            <h4 className="text-lg font-medium">Explore</h4>
            <div className="flex flex-col gap-5 text-primary text-sm font-medium">
              <Link href="#">Buy</Link>
              <Link href="#">Rent</Link>
              <Link href="#">Youngster Program</Link>
              <Link href="#">List Your Property</Link>
              <Link href="#">Build Your Villa</Link>
              <Link href="#">Crypto</Link>
            </div>
          </div>
          <div className="space-y-8">
            <h4 className="text-lg font-medium">Explore</h4>
            <div className="flex flex-col gap-5 text-primary text-sm font-medium">
              <Link href="#">Buy</Link>
              <Link href="#">Rent</Link>
              <Link href="#">Youngster Program</Link>
              <Link href="#">List Your Property</Link>
              <Link href="#">Build Your Villa</Link>
              <Link href="#">Crypto</Link>
            </div>
          </div>
          <div className="space-y-8">
            <h4 className="text-lg font-medium">Explore</h4>
            <div className="flex flex-col gap-5 text-primary text-sm font-medium">
              <Link href="#">Buy</Link>
              <Link href="#">Rent</Link>
              <Link href="#">Youngster Program</Link>
              <Link href="#">List Your Property</Link>
              <Link href="#">Build Your Villa</Link>
              <Link href="#">Crypto</Link>
            </div>
          </div>
          <div className="space-y-8">
            <h4 className="text-lg font-medium">Explore</h4>
            <div className="flex flex-col gap-5 text-primary text-sm font-medium">
              <Link href="#">Buy</Link>
              <Link href="#">Rent</Link>
              <Link href="#">Youngster Program</Link>
              <Link href="#">List Your Property</Link>
              <Link href="#">Build Your Villa</Link>
              <Link href="#">Crypto</Link>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <h4 className="text-lg font-medium">Get the app</h4>
          <div className="flex flex-col gap-5">
            <Button
              className="h-[75px] justify-start gap-4 py-4"
              variant="primary-blue"
            >
              <GooglePlayLogo size={23} />
              <Separator orientation="vertical" className="bg-white/20" />
              <div className="flex flex-col gap-1 items-start">
                <span>Get in on</span>
                <span className="text-lg font-medium">Google Play</span>
              </div>
            </Button>
            <Button
              className="h-[75px] justify-start gap-4 py-4"
              variant="primary-blue"
            >
              <GooglePlayLogo size={23} />
              <Separator orientation="vertical" className="bg-white/20" />
              <div className="flex flex-col gap-1 items-start">
                <span>Get in on</span>
                <span className="text-lg font-medium">Google Play</span>
              </div>
            </Button>
          </div>
        </div>
      </Container>
      <Container className="space-y-[30px]">
        <Separator />
        <div className="text-center space-y-3 text-sm font-medium">
          <p>All Rights Reserved © 2024 Property Shop Investment LLC.</p>
          <p>
            License No.:CN-1100434 | Brokerage No.:202100982107 | Privacy |
            Terms of use
          </p>
        </div>
      </Container>
    </footer>
  )
}
