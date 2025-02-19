import ProjectPageItem from './ProjectPageItem';
import { ComponentProps, ComponentType, FC } from 'react';
import { TextHighlight } from '@/components/ui/typography';
import dynamic from 'next/dynamic';
import { ProjectComponentProps } from './model';

export const AmenitiesCard: FC<{
  title: string;
  id: number;
}> = ({ title, id }) => {
  const Icon: ComponentType<ComponentProps<'svg'>> = dynamic(() =>
    import(`@/assets/icons/amenities/${id}.svg`).catch(
      () => import(`@/assets/icons/logo.svg`)
    )
  );
  return (
    <div className='border py-4 px-3 border-[#ECECEC] min-w-[200px] w-1/5 rounded-lg'>
      <span className='text-base  font-medium capitalize  flex items-center'>
        <Icon className='text-[#E0592A] bg-[#F9F9F9] p-3 size-12 mr-2' />
        {title}
      </span>
    </div>
  );
};

const ProjectAmenities: FC<ProjectComponentProps> = ({ property }) => {
  return (
    <ProjectPageItem
      title={
        <>
          {property.name} <TextHighlight>Key Amenities</TextHighlight>
        </>
      }
    >
      <div className='flex flex-wrap gap-5'>
        {property.amenities?.map((amenity, index) => (
          <AmenitiesCard
            key={index + amenity.id}
            title={amenity.name}
            id={amenity.id}
          />
        ))}
      </div>
    </ProjectPageItem>
  );
};
export default ProjectAmenities;
