import { getBannerByPosition } from '@/services/banners';
import { ProjectComponent } from './model';
import { Carousel, CarouselContent } from '@/components/ui/carousel';
import BannerItem from './BannerItem';
import Image from 'next/image';

const ProjectBanners: ProjectComponent = async ({ property }) => {
  const banners = await getBannerByPosition('GENERAL', property.id);

  return (
    <div className='hidden lg:block'>
      <Carousel>
        <CarouselContent className='ml-0'>
          {banners.length > 0 ? (
            banners.map((banner) => (
              <BannerItem key={banner.id} banner={banner} />
            ))
          ) : (
            <Image 
              src='/images/banners/default-project.png'
              alt='Default Banner' 
              width={413} 
              height={413} 
              className='rounded-xl'
            />
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ProjectBanners;
