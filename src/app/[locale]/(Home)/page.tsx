import { FeaturedProjectsSection } from "./featured-projects-section/FeaturedProjectsSection"
import { HeroSection } from "./hero-section/HeroSection"
import { HotDealsSection } from "./hot-deals-section/HotDealsSection"
import { NewLaunchesProjects } from "./new-launches-projects/NewLaunchesProjects"
import { PopularAreasSection } from "./popular-areas-section/PopularAreasSection"

export default function Home() {
  return (
    <main className="py-[50px] space-y-[70px]">
      <HeroSection />
      <FeaturedProjectsSection />
      <HotDealsSection operation="SALE" />
      <HotDealsSection operation="RENT" />
      <PopularAreasSection />
      <NewLaunchesProjects />
    </main>
  )
}
