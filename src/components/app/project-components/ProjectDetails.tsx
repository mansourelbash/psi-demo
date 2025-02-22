import { TextHighlight, TypographyH2 } from '@/components/ui/typography';
import {
  Building,
  Building2,
  Calendar,
  LucideIcon,
  School,
  Tag,
} from 'lucide-react';
import { ReactNode } from 'react';
import { FC } from 'react';
import CurrencyConverter from '../CurrencyConverter';
import moment from 'moment';
import HandoverIcon from '@/components/icons/handover-icon';
import { SVGProps } from 'react';
import { DeveloperIcon } from '@/components/icons/developer-icon';
import { LocationIcon } from '@/components/icons/LocationIcon';
import ProjectPageItem from './ProjectPageItem';
import { ProjectComponentProps } from './model';

const DetailItem: FC<{
  title: string;
  value: string | number | ReactNode;
  icon: LucideIcon | FC<SVGProps<SVGSVGElement>>;
}> = ({ title, value, icon: Icon }) => {
  return (
    <div className='w-max flex gap-[10px] items-center min-w-[22%] '>
      <Icon className=' text-[#E0592A]' />
      <div className=''>
        <TypographyH2 className='text-sm font-normal capitalize'>
          {title}
        </TypographyH2>
        <TypographyH2 className='text-lg font-medium'>{value}</TypographyH2>
      </div>
    </div>
  );
};

const ProjectDetails: FC<ProjectComponentProps> = ({ property }) => {
  const currentDate = moment();
  const handoverDate = moment(property.handover_date);
  const formatDate = (date: string | Date) => {
    const m = moment(date);
    const quarter = `Q${m.quarter()}`;
    const monthYear = m.format('MMM YYYY');
    return `${quarter} - ${monthYear}`;
  };
  return (
    <ProjectPageItem
      title={
        <>
          {property.name} property <TextHighlight>Details</TextHighlight>
        </>
      }
    >
      <div className='flex flex-wrap  gap-5'>
        {property.min_selling_price && (
          <DetailItem
            title='starting price'
            value={
              <CurrencyConverter>
                {property.min_selling_price}
              </CurrencyConverter>
            }
            icon={Tag}
          />
        )}
        <DetailItem
          title='property type'
          value={property.property_type.name}
          icon={Building}
        />
        {property.handover_date && (
          <DetailItem
            title='property status'
            value={currentDate.diff(handoverDate) > 0 ? 'Ready' : 'Off Plan'}
            icon={Building2}
          />
        )}
        {property.unit_types?.length && (
          <DetailItem
            title='unit types'
            value={property.unit_types.map((type) => type.name).join(', ')}
            icon={School}
          />
        )}
        {property.handover_date && (
          <DetailItem
            title='handover date'
            value={formatDate(property.handover_date)}
            icon={HandoverIcon}
          />
        )}
        {property.developer?.name && (
          <DetailItem
            title='developer'
            value={property.developer?.name}
            icon={() => (
              <DeveloperIcon className='size-[27.1px] text-[#E0592A]' />
            )}
          />
        )}
        {property.launch_date && (
          <DetailItem
            title='launch date'
            value={moment(property.launch_date).format('YYYY-MM-DD')}
            icon={Calendar}
          />
        )}
        {property.city.name && (
          <DetailItem
            title='location'
            value={property.city.name}
            icon={() => (
              <LocationIcon className='size-[27.1px] text-[#E0592A]' />
            )}
          />
        )}
      </div>
    </ProjectPageItem>
  );
};
export default ProjectDetails;
