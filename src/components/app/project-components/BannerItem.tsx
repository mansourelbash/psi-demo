'use client';

import { CarouselItem } from '@/components/ui/carousel';
import { Banner } from '@/types/Banner';
import Image from 'next/image';
import { FC } from 'react';

const BannerItem: FC<{ banner: Banner }> = ({ banner }) => {
  return (
    banner.image?.preview && (
      <CarouselItem
        onClick={() => window.open(banner.image?.preview, '_blank')}
      >
        <Image src={banner.image?.preview} alt='' width={1000} height={1000} />
      </CarouselItem>
    )
  );
};
export default BannerItem;
