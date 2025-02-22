import { TypographyH2 } from '@/components/ui/typography';
import { ReactNode } from 'react';
import { FC } from 'react';

const ProjectPageItem: FC<{ title: ReactNode; children: ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className='flex flex-col gap-7  w-full'>
      <TypographyH2 className='capitalize text-[32px] font-medium'>
        {title}
      </TypographyH2>
      {children}
    </div>
  );
};
export default ProjectPageItem;
