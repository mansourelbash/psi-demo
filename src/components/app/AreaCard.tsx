import React from 'react';
import { Card } from '../ui/card';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Badge } from '../ui/badge/badge';
import { AreaCardProps } from '@/types/agent';

const AreaCard: React.FC<AreaCardProps> = ({ location, index }) => {
  return (
    <Card
      key={index}
      className='group relative h-[430px] w-[350px] overflow-hidden rounded-lg border-0 bg-transparent mx-auto max-w-full'
    >
      <div className='aspect-[4/3] relative h-full w-full overflow-hidden rounded-lg'>
        <Image
          src={location?.image ?? '/images/locations/locations1.png'}
          alt={location?.title || 'Location Title'}
          fill
          className='object-cover transition-transform duration-300 group-hover:scale-110'
        />
        <div className='absolute inset-0 bg-black/40' />
        <div className='absolute bottom-4 left-4 right-4 space-y-2'>
          <h3 className='text-xl font-semibold text-white'>
            {location?.title}
          </h3>
          <div className='flex items-center gap-1 text-white/90'>
            <MapPin className='h-4 w-4' />
            <span className='text-sm'>{location?.location}</span>
          </div>
          <div className='flex flex-wrap gap-2'>
            {location?.types.map((type, typeIndex) => (
              <Badge
                key={typeIndex}
                variant='outline'
                className='bg-white/10 hover:bg-white/20 text-white'
              >
                {type}
              </Badge>
            ))}
            <Badge
              variant='outline'
              className='bg-white/10 hover:bg-white/20 text-white'
            >
              {location.city}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AreaCard;
