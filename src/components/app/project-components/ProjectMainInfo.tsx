import { TypographyH2 } from '@/components/ui/typography';
import { FC } from 'react';
import CurrencyConverter from '../CurrencyConverter';
import { Chip } from '@/components/ui/chip';
import { CheckCircleIcon } from '@/components/icons/check-icon';
import { ProjectComponentProps } from './model';

const ProjectMainInfo: FC<ProjectComponentProps> = ({ property }) => {
  return (
    <div className='w-full flex- flex-col gap-5'>
      <TypographyH2 className='text-[#414042] text-[44px] font-bold capitalize'>
        {property.name}
      </TypographyH2>
      <TypographyH2 className='text-[#E0592A]'>
        Starting from{' '}
        <span className='font-medium text-[44px]'>
          <CurrencyConverter className='text-3xl font-normal'>
            {property.min_selling_price}
          </CurrencyConverter>
        </span>
      </TypographyH2>
      <div className='flex gap-3 flex-wrap'>
        {property.usps.map((usp, index) => (
          <Chip
            className='rounded-full bg-[#F9F9F9] p-5 text-lg font-normal'
            key={index}
          >
            <CheckCircleIcon />
            {usp.name}
          </Chip>
        ))}
      </div>
    </div>
  );
};
export default ProjectMainInfo;
