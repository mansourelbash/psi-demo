import { AboutUsAwardsSection } from "./about-us-awards-section/AboutUsAwardsSection"
import { AppSection } from "./app-section/AppSection"
import { EasyInstalmentsSection } from "./easy-instalments-section/EasyInstalmentsSection"
import { FeaturedProjectsSection } from "./featured-projects-section/FeaturedProjectsSection"
import { HeroSection } from "./hero-section/HeroSection"
import { HigherROISection } from "./higher-roi-section/HigherROISection"
import { HotDealsSection } from "./hot-deals-section/HotDealsSection"
import { NewLaunchesProjects } from "./new-launches-projects/NewLaunchesProjects"
import { PopularAreasSection } from "./popular-areas-section/PopularAreasSection"
import { ReadyToMoveSection } from "./ready-to-move-section/ReadyToMoveSection"

export default function Home() {
  return (
    <main className="py-[50px] space-y-[70px]">
      <HeroSection />
      <FeaturedProjectsSection />
      <HotDealsSection operation="SALE" />
      <HotDealsSection operation="RENT" />
      <PopularAreasSection />
      <NewLaunchesProjects />
      <EasyInstalmentsSection />
      <ReadyToMoveSection />
      <AppSection />
      <HigherROISection />
      <AboutUsAwardsSection />
    </main>
  )
}
