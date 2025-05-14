'use client';

import Image from 'next/image';
import Brochure from '../../../../public/images/brochure.png';
import { ProjectComponent } from './model';
import { Button } from '@/components/ui/button';

const ProjectBrochure: ProjectComponent = ({ property }) => {
  const brochure = property.media?.find((media) =>
    [61796, 63381, 63865].includes(media.category.id)
  );
  if (!brochure) {
    return null;
  }
  return (
    <div className='flex flex-col  gap-4 border border-[#ECECEC] rounded-[15px] p-3'>
      <Image
        src={Brochure}
        height={250}
        width={300}
        alt='Brochure'
        className='w-full min-w-[300px] h-[280px] flex-1'
      />
      <Button onClick={() => window.open(brochure.url?.original, '_blank')}>
        Download Brochure
      </Button>
    </div>
  );
};
export default ProjectBrochure;
