import {
  Info,
  InfoDataContainer,
  InfoIconContainer,
  InfoTitle,
} from '@/components/app/Info';
import { ApartmentIcon } from '@/components/icons/apartment-icon';

import { TypographyH2 } from '@/components/ui/typography';
export type UnitType = {
  id: number
  name: string
  slug: string | null | undefined
  type_id: string | null
}

type CommunityOverviewProps = {
  unit_types: UnitType[]
  community_name: string
}

export const CommunityOverviewSection = ({unit_types, community_name}: CommunityOverviewProps) => {

  return (
    <div className='space-y-7'>
      <TypographyH2 className='font-medium'>Property Types in {community_name}</TypographyH2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      
        {unit_types && unit_types.length> 0 && unit_types.map((item)=>  {return (
          <Info key={item.id} className='border border-[#ECECEC] px-4 py-4 rounded-md'>
          <InfoIconContainer>
            <ApartmentIcon className='size-6' />
          </InfoIconContainer>
          <InfoDataContainer className='flex justify-between w-full flex-shrink items-center'>
          <InfoTitle>{item.name}</InfoTitle>

            {/* <InfoDesc>
            %65 
            </InfoDesc> */}
          </InfoDataContainer>
        </Info>
        )})}
      </div>
    </div>
  );
};
