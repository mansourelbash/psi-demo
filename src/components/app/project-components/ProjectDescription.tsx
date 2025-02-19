'use client';

import { FC } from 'react';
import ProjectPageItem from './ProjectPageItem';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ProjectComponentProps } from './model';

const ProjectDescription: FC<ProjectComponentProps> = ({ property }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <ProjectPageItem title='description'>
      {showMore ? (
        property.overview
      ) : (
        <p className='text-lg font-normal'>
          {property.overview?.slice(0, 300).padEnd(305, '....')}
        </p>
      )}
      <Button
        variant={'link'}
        className='self-start capitalize text-[#E0592A] text-sm font-normal p-1'
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? 'read less' : 'read more'}
        {showMore ? <ChevronUp /> : <ChevronDown />}
      </Button>
    </ProjectPageItem>
  );
};
export default ProjectDescription;
