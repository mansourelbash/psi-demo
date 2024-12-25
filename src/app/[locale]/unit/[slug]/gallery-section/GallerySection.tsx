import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Container } from "@/components/ui/container"
import { MediaModel } from "@/types/Shared"
import { UnitModel } from "@/types/Unit"
import Image from "next/image"
import { Children } from "react"

type Props = {
  unit: UnitModel
}
export const GallerySection = ({ unit }: Props) => {
  let coverImage: { image?: MediaModel; index?: number } = {}

  const media = unit.media
    ?.filter((media, index) => {
      if (media.is_cover) {
        coverImage = {
          image: media,
          index,
        }
        return false
      } else {
        return true
      }
    })
    .slice(0, 4)

  return (
    <Container className="mt-5 flex gap-6">
      <div className="rounded-[20px] overflow-hidden grow relative [&>div]:min-h-full">
        <AspectRatio ratio={1433 / 760}>
          <Image
            src={coverImage.image?.url?.preview ?? "/logo.svg"}
            alt=""
            fill
            className="object-cover"
            // loading="lazy"
          />
        </AspectRatio>
      </div>
      <div className="basis-2/12 flex flex-col gap-5 shrink-0">
        {Children.toArray(
          media?.map((image) => (
            <AspectRatio ratio={267 / 160}>
              <Image
                src={image.url?.preview ?? "logo.svg"}
                alt=""
                width={279}
                height={248}
                className="size-full object-cover rounded-xl"
                // loading="lazy"
                // onClick={() =>
                //   handelOpenGalleryDialog(
                //     unit.media ?? [],
                //     coverImage.index && coverImage.index <= index
                //       ? index + 1
                //       : index
                //   )
                // }
              />
            </AspectRatio>
          ))
        )}
      </div>
    </Container>
  )
}
