import {
  Info,
  InfoDataContainer,
  InfoDesc,
  InfoTitle,
} from '@/components/app/Info';
import { PriceLabelIcon } from '@/components/icons/price-label-icon';
import { LocationIcon } from '@/components/icons/LocationIcon';
import { TypographyH2 } from '@/components/ui/typography';
import { ProjectSummaryModel } from '@/types/Property';
import { CalendarIcon } from '@/components/icons/calendar-icon';
import { BoxSizeIcon } from '@/components/icons/box-size-icon';
import { HardHatIcon } from '@/components/icons/hard-hat-icon';
import { SecurityCameraIcon } from '@/components/icons/security-camera-icon';
import CurrencyConverter from '@/components/app/CurrencyConverter';

type Props = {
  property: ProjectSummaryModel;
};

export const ProjectSummerySection = ({ property }: Props) => {
  const items = [
    {
      icon: <LocationIcon className='size-6 text-primary' />,
      title: 'Location',
      desc: property.community_name ?? '---',
    },
    {
      icon: <PriceLabelIcon className='size-6 text-primary' />,
      title: 'Starting price from',
      desc: (
        <CurrencyConverter emptyValue='---'>
          {property?.min_selling_price}
        </CurrencyConverter>
      ),
    },
    {
      icon: <CalendarIcon className='size-6 text-primary' />,
      title: 'Launched date',
      desc: property.launch_date ?? '---',
    },
    {
      icon: <BoxSizeIcon className='size-6 text-primary' />,
      title: 'Area Form (sq.ft)',
      desc: `${property.min_total_sqft} to ${property.max_total_sqft}`,
    },
    {
      icon: <BoxSizeIcon className='size-6 text-primary' />,
      title: 'Handover',
      desc: property.handover_date ?? '---',
    },
    {
      icon: <HardHatIcon className='size-6 text-primary' />,
      title: 'Developer',
      desc: property.developer_name ?? '---',
    },
    {
      icon: <SecurityCameraIcon className='size-6 text-primary' />,
      title: 'Service Charge',
      desc: property.service_charge ?? '---',
    },
  ];

  return (
    <div className='space-y-7'>
      <TypographyH2 className='font-medium'>Project Summary</TypographyH2>
      <div className='grid grid-cols-2 sm:grid-cols-2 gap-4'>
        {items.map(({ icon, title, desc }, i) => (
          <Info key={i} className='flex items-start gap-4'>
            {icon}
            <InfoDataContainer>
              <InfoTitle className='text-base sm:text-lg font-medium'>
                {title}
              </InfoTitle>
              <InfoDesc className='text-sm sm:text-base'>{desc}</InfoDesc>
            </InfoDataContainer>
          </Info>
        ))}
      </div>
    </div>
  );
};
