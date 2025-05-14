
import { AboutUsAwardsSection } from './about-us-awards-section/AboutUsAwardsSection';
import { AppSection } from './app-section/AppSection';
import { EasyInstallmentsSection } from './easy-installments-section/EasyInstallmentsSection';
import { FeaturedProjectsSection } from './featured-projects-section/FeaturedProjectsSection';
import { HeroSection } from './hero-section/HeroSection';
import { HigherROISection } from './higher-roi-section/HigherROISection';
import { HotDealsSection } from './hot-deals-section/HotDealsSection';
import { MediaSection } from './media-section/MediaSection';
import { NewLaunchesProjects } from './new-launches-projects/NewLaunchesProjects';
import { PopularAreasSection } from './popular-areas-section/PopularAreasSection';
import { ReadyToMoveSection } from './ready-to-move-section/ReadyToMoveSection';
import { Suspense } from 'react';
import { Locale } from '@/i18n.config';
import { CityIds } from '@/types/Shared';
import MapSection from './map-section/MapSection';
import LoaderSpinner from '@/components/app/Loader';
import { EducationSection } from './education-section/EducationSection';

type HomeProps = {
  params: Promise<{
    locale: Locale;
    city: keyof typeof CityIds;
  }>;
};
export default async function Home({ params }: HomeProps) {
  const { locale, city } = await params;
  return (
    <Suspense
      fallback={
        <div className='relative inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50'>
          <LoaderSpinner />
        </div>
      }
    >
      <main className='py-[50px] space-y-[70px]'>
        <HeroSection />
        <FeaturedProjectsSection city={city} />
        <HotDealsSection operation='SALE' city={city} />
        <HotDealsSection operation='RENT' city={city} />
        <PopularAreasSection city={city} />
        <NewLaunchesProjects city={city} />
        <EasyInstallmentsSection city={city} />
        <MapSection />
        <ReadyToMoveSection city={city} />
        <AppSection />
        <HigherROISection city={city} locale={locale} />
        <EducationSection city={city}  />
        <AboutUsAwardsSection />
        <MediaSection />
      </main>
    </Suspense>
  );
}
