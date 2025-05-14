'use client';

import ProjectPageItem from './ProjectPageItem';
import { FC, useEffect, useState } from 'react';
import { TextHighlight } from '@/components/ui/typography';
import { ProjectComponentProps } from './model';

const ITEMS_TO_SHOW = 11;

const AmenitiesCard: FC<{ title: string; id: number }> = ({ title, id }) => {
  const [Icon, setIcon] = useState<FC | null>(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const mod = await import(`@/assets/icons/amenities/${id}.svg`);
        setIcon(() => mod.default);
      } catch (err) {
        console.warn(`Icon not found for ID ${id}, skipping icon render. ${err}`);
        setIcon(null);
      }
    };

    loadIcon();
  }, [id]);

  return (
    <div className='border py-4 px-3 border-[#ECECEC] rounded-lg flex items-center w-full sm:w-[calc(50%-0.625rem)] md:w-[calc(33.333%-0.666rem)] lg:w-[calc(25%-0.75rem)] xl:w-[calc(20%-0.8rem)] min-w-[0]'>
      <span className='text-base font-medium capitalize flex items-center'>
        {Icon && (
          <span className='text-[#E0592A] bg-[#F9F9F9] p-3 size-12 mr-2 flex items-center justify-center'>
            <Icon />
          </span>
        )}
        {title}
      </span>
    </div>
  );
};

const ProjectAmenities: FC<ProjectComponentProps> = ({ property }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const totalItems = property?.amenities?.length || 0;
  const visibleCount = isExpanded ? totalItems : ITEMS_TO_SHOW;
  const remainingCount = totalItems - ITEMS_TO_SHOW;

  return (
    <ProjectPageItem
      title={
        <>
          {property?.name} <TextHighlight>Key Amenities</TextHighlight>
        </>
      }
    >
      <div className='flex flex-wrap gap-5'>
        {property?.amenities?.slice(0, visibleCount).map((amenity, index) => (
          <AmenitiesCard
            key={index + amenity.id}
            title={amenity.name}
            id={amenity.id}
          />
        ))}

        {totalItems > ITEMS_TO_SHOW && (
          <div
            className='border py-4 px-3 border-[#ECECEC] rounded-lg flex justify-center items-center cursor-pointer bg-[#FCEDE9] hover:bg-gray-200 w-full sm:w-[calc(50%-0.625rem)] md:w-[calc(33.333%-0.666rem)] lg:w-[calc(25%-0.75rem)] xl:w-[calc(20%-0.8rem)] min-w-[0]'
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className='text-base font-medium capitalize text-center text-[#E0592A]'>
              {isExpanded ? 'Show Less' : `+${remainingCount} More Amenities`}
            </span>
          </div>
        )}
      </div>
    </ProjectPageItem>
  );
};

export default ProjectAmenities;
