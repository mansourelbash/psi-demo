import { TextHighlight } from '@/components/ui/typography';
import ProjectPageItem from './ProjectPageItem';
import { FC } from 'react';
import { ReactNode } from 'react';
import { Calendar, LucideIcon } from 'lucide-react';
import { SVGProps } from 'react';
import { DoubleBedIcon } from '@/components/icons/bed-icon';
import {
  CommunityIcon,
  ProjectNameIcon,
  ProjectTypeIcon,
  UnitTypeIcon,
} from '@/components/icons/BuildingIcons';
import moment from 'moment';
import { AreaIcon } from '@/components/icons/size-icon';
import SpaceUnitConverter from '../SpaceUnitConverter';
import { LocationIcon } from '@/components/icons/LocationIcon';
import CurrencyConverter from '../CurrencyConverter';
import { PriceLabelIcon } from '@/components/icons/price-label-icon';
import ServiceChargeIcon from '@/components/icons/ServiceChargeIcon';
import { ProjectComponentProps } from './model';

const FactCard: FC<{
  title: string;
  value: ReactNode;
  icon: LucideIcon | FC<SVGProps<SVGSVGElement>>;
}> = ({ title, value, icon: Icon }) => {
  return (
    <div className=' w-[32%] min-w-[300px] flex gap-[10px] justify-between items-center py-4 px-3 border border-[#ECECEC] rounded-sm'>
      <span className='text-base 3xl:text-lg font-medium capitalize  flex items-center'>
        <Icon className='text-[#414042] bg-[#F9F9F9] p-3 size-12 mr-2' />
        {title}
      </span>
      <span className='text-base 3xl:text-lg font-normal'>{value}</span>
    </div>
  );
};

const ProjectFacts: FC<ProjectComponentProps> = ({ property }) => {
  return (
    <ProjectPageItem
      title={
        <>
          {property.name} <TextHighlight>Facts</TextHighlight>
        </>
      }
    >
      <div className=' flex  gap-2 flex-wrap'>
        <FactCard
          title='bedrooms'
          value={`${property.min_bedrooms} - ${property.max_bedrooms} bedroom`}
          icon={DoubleBedIcon}
        />
        <FactCard
          title='project name'
          value={property.name}
          icon={ProjectNameIcon}
        />
        <FactCard
          title='project name'
          value={property.property_type.name}
          icon={ProjectTypeIcon}
        />
        {!!property.unit_types?.length && (
          <FactCard
            title='project name'
            value={property.unit_types?.map((unit) => unit.name).join(', ')}
            icon={UnitTypeIcon}
          />
        )}
        {!!property.launch_date && (
          <FactCard
            title='launch date'
            value={moment(property.launch_date).format('MMM YYYY')}
            icon={Calendar}
          />
        )}
        {property.min_total_sqft && property.max_total_sqft && (
          <FactCard
            title='Area Range'
            value={
              <SpaceUnitConverter
                range
                rangeValues={[property.min_total_sqft, property.max_total_sqft]}
              />
            }
            icon={AreaIcon}
          />
        )}
        <FactCard
          title='location'
          value={property.city.name}
          icon={LocationIcon}
        />
        <FactCard
          title='Community'
          value={property.community.name}
          icon={CommunityIcon}
        />
        <FactCard
          title='Starting from'
          value={
            <CurrencyConverter>{property.min_selling_price}</CurrencyConverter>
          }
          icon={PriceLabelIcon}
        />
        {property.service_charge && (
          <FactCard
            title='Service Charge'
            value={property.service_charge}
            icon={ServiceChargeIcon}
          />
        )}
      </div>
    </ProjectPageItem>
  );
};
export default ProjectFacts;
