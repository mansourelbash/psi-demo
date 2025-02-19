import { getBannerByPosition } from '@/services/banners';
import { ProjectComponent } from './model';
import { Carousel, CarouselContent } from '@/components/ui/carousel';
import BannerItem from './BannerItem';

const ProjectBanners: ProjectComponent = async ({ property }) => {
  const banners = await getBannerByPosition('GENERAL', property.id);
  if (!banners.length) {
    return null;
  }
  return (
    <div className='hidden lg:block'>
      <Carousel>
        <CarouselContent>
          {banners.map((banner) => (
            <BannerItem key={banner.id} banner={banner} />
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
export default ProjectBanners;
