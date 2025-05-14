import { AppleIcon } from "@/components/icons/apple-icon"
import { GooglePlay } from "@/components/icons/google-play-icon"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  ArrowRight,
  FacebookLogo,
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
    <footer className="bg-secondary-white py-[30px] space-y-20 max-w-full xs:mx-5px">
      <Container>
        <div className="flex flex-wrap justify-between gap-2"> {/* Ensures items wrap properly */}
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

      <Container className="flex flex-col md:flex-row gap-6 sm:gap-12"> {/* Adjusted gap for mobile responsiveness */}
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

        <div className="flex flex-wrap justify-between gap-8 sm:gap-12 md:flex-row w-full"> {/* Added flex-wrap for mobile */}
          <div className="space-y-8 w-full sm:w-auto">
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

          <div className="space-y-8 w-full sm:w-auto">
            <h4 className="text-lg font-medium">New Projects</h4>
            <div className="flex flex-col gap-5 text-primary text-sm font-medium">
              <Link href="#">Saadiyat Lagoons</Link>
              <Link href="#">Hudayriyat Island</Link>
              <Link href="#">Hudayriyat Island</Link>
              <Link href="#">Ramhan Island</Link>
              <Link href="#">Athlon</Link>
              <Link href="#">More</Link>
            </div>
          </div>

          <div className="space-y-8 w-full sm:w-auto">
            <h4 className="text-lg font-medium">Important Links</h4>
            <div className="flex flex-col gap-5 text-primary text-sm font-medium">
              <Link href="#">Mortgage Calculator</Link>
              <Link href="#">About Us</Link>
              <Link href="#">Contact Us</Link>
              <Link href="#">Careers</Link>
              <Link href="#">Blog</Link>
              <Link href="#">Sitemap</Link>
            </div>
          </div>

          <div className="space-y-8 w-full sm:w-auto">
            <h4 className="text-lg font-medium">Contact us</h4>
            <div className="flex flex-col gap-5 text-primary text-sm font-medium">
              <Link href="#">Local Tel: 600 548 200</Link>
              <Link href="#">Int&apos;l Tel: +971 2205 2999</Link>
            </div>
          </div>
        </div>

        {/* App download section */}
        <div className="space-y-8 w-full sm:w-auto">
          <h4 className="text-lg font-medium">Get the app</h4>
          <div className="flex flex-col gap-5">
            <Button className="h-[75px] justify-start gap-4 py-4">
              <AppleIcon className="size-8 ml:2" />
              <Separator orientation="vertical" className="bg-white/20" />
              <div className="flex flex-col gap-1 items-start">
                <span>Download on the</span>
                <span className="text-lg font-medium">Apple Store</span>
              </div>
            </Button>
            <Button className="h-[75px] justify-start gap-4 py-4">
              <GooglePlay className="size-6 ml:2" />
              <Separator orientation="vertical" className="bg-white/20" />
              <div className="flex flex-col gap-1 items-start">
                <span>Get it on</span>
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
            License No.:CN-1100434 | Brokerage No.:202100982107 | Privacy | Terms of use
          </p>
        </div>
      </Container>
    </footer>
  );
};

