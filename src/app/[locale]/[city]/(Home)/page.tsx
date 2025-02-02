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
        <div className='w-full'>
          <h2 className='text-center'>loading....</h2>
        </div>
      }
    >
      <main className='py-[50px] space-y-[70px]'>
        <HeroSection />
        <FeaturedProjectsSection city={city} />
        <HotDealsSection operation='SALE' city={city} locale={locale} />
        <HotDealsSection operation='RENT' city={city} locale={locale} />
        <PopularAreasSection />
        <NewLaunchesProjects city={city} />
        <EasyInstallmentsSection city={city} />
        <ReadyToMoveSection city={city} locale={locale} />
        <AppSection />
        <HigherROISection city={city} locale={locale} />
        <AboutUsAwardsSection />
        <MediaSection />
      </main>
    </Suspense>
  );
}
