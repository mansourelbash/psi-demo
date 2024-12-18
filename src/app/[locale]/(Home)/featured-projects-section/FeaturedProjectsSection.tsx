import { ProjectCard } from "@/components/app/ProjectCard"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Container } from "@/components/ui/container"
import { TextHighlight, TypographyH2 } from "@/components/ui/typography"

type Props = {}
export const FeaturedProjectsSection = (props: Props) => {
  return (
    <Container>
      <Carousel opts={{ align: "start" }} className="w-full space-y-[30px]">
        <div className="flex justify-between gap-2">
          <TypographyH2>
            Discover Our <TextHighlight>Featured</TextHighlight> Projects in Abu
            Dhabi
          </TypographyH2>
          <div className="flex gap-3 items-center">
            <div className="flex gap-3">
              <CarouselPrevious className="size-[50px] relative top-0 left-0 right-0 translate-y-0" />
              <CarouselNext className="size-[50px] relative top-0 left-0 right-0 translate-y-0" />
            </div>
            <Button
              variant="primary-blue"
              className="w-[165px] h-[50px] rounded-lg"
            >
              See More
            </Button>
          </div>
        </div>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="lg:basis-1/4">
              <ProjectCard />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Container>
  )
}
