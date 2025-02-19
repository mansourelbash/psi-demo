'use client';

import { TextHighlight } from '@/components/ui/typography';
import ProjectPageItem from './ProjectPageItem';
import { FC, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import GalleryDialog from '../GalleryDialog';
import ArrowRightCircleIcon from '@/components/icons/ArrowRightCircleIcon';
import { ProjectComponentProps } from './model';
import ButtonGroup from '../ButtonGroup';
import { cn } from '@/lib/utils';

const ProjectGallery: FC<ProjectComponentProps> = ({ property }) => {
  const [open, setOpen] = useState(false);
  if (!property.media) {
    return null;
  }
  return (
    <ProjectPageItem
      title={
        <div className='flex justify-between items-center flex-wrap flex-col sm:flex-row'>
          <div>
            {property.name} <TextHighlight>Gallery</TextHighlight>
          </div>
          <ButtonGroup
            categories={['interior', 'exterior', 'facilitate']}
            className='gap-2'
          />
        </div>
      }
    >
      <div className='grid grid-cols-12 row-span-3 gap-4 relative '>
        <Button
          className='absolute bottom-5 right-0 bg-transparent text-[32px] hover:bg-transparent'
          onClick={() => setOpen(true)}
        >
          Gallery <ArrowRightCircleIcon className='size-8 ml:2' />
        </Button>
        {[...property.media].slice(0, 6).map(
          (media, index) =>
            media.url?.preview && (
              <div
                key={index}
                className={cn(
                  [0, 5].includes(index)
                    ? 'col-span-12 sm:col-span-6 '
                    : 'col-span-6 sm:col-span-3  ',
                  'last:hidden sm:last:block'
                )}
              >
                <Image
                  src={media.url.preview}
                  width={500}
                  height={1000}
                  alt={media.category.name}
                  className='rounded-md h-full w-full'
                />
              </div>
            )
        )}
      </div>
      <GalleryDialog open={open} setOpen={setOpen} images={property.media} />
    </ProjectPageItem>
  );
};
export default ProjectGallery;
