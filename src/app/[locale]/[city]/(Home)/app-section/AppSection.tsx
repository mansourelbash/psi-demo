import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { TextHighlight, TypographyH2 } from "@/components/ui/typography";
import { GooglePlayLogo } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

export const AppSection = () => {
  return (
    <Container>
      <div className="bg-secondary-white rounded-[20px] pt-14 flex flex-col items-center space-y-8">
        <div className="max-w-[996px] text-center space-y-3.5">
          <TypographyH2>
            Psi Real Estate App <TextHighlight>Available</TextHighlight> Now !
          </TypographyH2>
          <p className="text-lg font-medium">
            Elevate your real estate experience with the Psi Real Estate app.
            Access listings and market insights, and connect with agents—all in
            one place.{" "}
            <a href="#" className="text-primary">
              Download now!
            </a>
          </p>
        </div>
        <div className="max-w-[1100px] flex gap-14 w-full overflow-hidden items-center">
          <div className="grow space-y-8">
            <Button className="h-[75px] justify-start w-full">
              <GooglePlayLogo size={23} />
              <Separator
                orientation="vertical"
                className="shrink-0 bg-border h-[1px] my-10 w-[90%]"
              />
              <div className="flex flex-col gap-1 items-start">
                <span>Get in on</span>
                <span className="text-lg font-medium">Google Play</span>
              </div>
            </Button>
            <div className="p-2 bg-background rounded-md">
              <Image
                src="/images/barcode.png"
                alt=""
                width={233}
                height={233}
              />
            </div>
          </div>
          <div className="h-[665px] w-[500px]">
            <AspectRatio ratio={500 / 665}>
              <Image
                src="/images/mobile-app.png"
                width={500}
                height={665}
                style={{ height: "200%" }}
                alt=""
                className="object-contain object-top"
              />
            </AspectRatio>
          </div>
          <div className="grow space-y-8">
            <Button className="h-[75px] justify-start w-full">
              <GooglePlayLogo size={23} />
              <Separator orientation="vertical" className="bg-white/20" />
              <div className="flex flex-col gap-1 items-start">
                <span>Get in on</span>
                <span className="text-lg font-medium">Apple Store</span>
              </div>
            </Button>
            <div className="p-2 bg-background rounded-md">
              <Image
                src="/images/barcode.png"
                alt=""
                width={233}
                height={233}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
