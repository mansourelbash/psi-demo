import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Container } from "@/components/ui/container";
import { TextHighlight, TypographyH2 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { getLandmarksByID } from "@/services/landmarks";
import { CityIds } from "@/types/Shared";
import Image from "next/image";
import { FC } from "react";
interface Landmark {
  image?: { url?: { preview?: string } };
  landmark_title?: string;
  starting_price?: string;
  city?: { name?: string };
  unit_type?: string;
}
type PopularAreasProps = {
  city: keyof typeof CityIds;
};
export const PopularAreasSection: FC<PopularAreasProps> = async ({ city }) => {
  const capitalize = (str?: string | null) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  const landmarks: Landmark[] = await getLandmarksByID(CityIds[city]);
  if (!landmarks?.length) return null;


  return (
    <Container className="space-y-[30px]">
      <TypographyH2>
        Discover <TextHighlight>Popular Areas</TextHighlight> in the UAE
      </TypographyH2>
      <div className="grid grid-cols-4 gap-[30px]">
        {landmarks.map((item: Landmark, index) => (
          <div
            key={index}
            className={cn("rounded-[19px] overflow-hidden text-white", {
              "col-span-2": index == 0 || index == 5,
            })}
          >
            <AspectRatio
              ratio={index == 0 || index == 5 ? 1.73 / 1 : 403 / 486}
            >
              <Image
                src={item?.image?.url?.preview ?? ""}
                fill
                alt=""
                className="object-cover"
              />
              <div className="absolute size-full top-0 start-0 bg-gradient-to-b from-primary-dark-blue/80 via-primary-dark-blue/10 to-primary-dark-blue/0"></div>
              <div className="space-y-3 py-12 px-8 z-10 relative">
                <h3 className="text-2xl font-medium">
                  {item?.landmark_title} , {item?.city?.name}
                </h3>
                <p className="text-sm font-semibold text-[15px]">
                  {item?.starting_price
                    ? `Starting Prices: ${capitalize(
                        item?.unit_type
                      )} from AED ${item.starting_price.toLocaleString()} `
                    : ""}
                </p>{" "}
              </div>
            </AspectRatio>
          </div>
        ))}
      </div>
    </Container>
  );
};

// const data = [
//   {
//     name: "Downtown Dubai, Dubai",
//     price: "Starting Prices: Apartments from AED 1,500,000",
//     image: "/images/area-01.png",
//   },
//   {
//     name: "Saadiyat Island, Abu Dhabi",
//     price: "Starting Prices: Villas from AED 3,000,000",
//     image: "/images/area-02.png",
//   },
//   {
//     name: "Yas Island, Abu Dhabi",
//     price: "Starting Prices: Apartments from AED 1,200,000",
//     image: "/images/area-03.png",
//   },
//   {
//     name: "Dubai Marina, Dubai",
//     price: "Starting Prices: Apartments from AED 900,000",
//     image: "/images/area-04.png",
//   },
//   {
//     name: "Al Reem Island, Abu Dhabi",
//     price: "Starting Prices: Apartments from AED 900,000",
//     image: "/images/area-05.png",
//   },
//   {
//     name: "Palm Jumeirah, Dubai",
//     price: "Starting Prices: Villas from AED 5,000,000",
//     image: "/images/area-06.png",
//   },
// ]
