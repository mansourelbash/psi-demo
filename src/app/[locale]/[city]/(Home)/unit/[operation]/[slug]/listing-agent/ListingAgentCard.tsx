import { TypographyH2 } from '@/components/ui/typography';
import { getListingAgents } from '@/services/units';
import { OperationType } from '@/types/Shared';
import React, { FC } from 'react';
import cover_list_by from '@/assets/icons/cover_list_by.jpg';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { EnvelopeSimple, Phone } from '@phosphor-icons/react/dist/ssr';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type ListingAgentCardProps = {
  unitId: number;
  operation: OperationType;
};
const ListingAgentCard: FC<ListingAgentCardProps> = async ({
  unitId,
  operation,
}) => {
  const listingAgent = await getListingAgents(unitId.toString(), operation);
  return (
    <div className='flex flex-col gap-3'>
      <TypographyH2 className='font-medium text-2xl'>Listed By :</TypographyH2>
      <div className='w-full border border-[#ECECEC] rounded-lg min-h-[355px] relative flex flex-col p-3 justify-between gap-3'>
        <div className='flex  flex-col !h-[140px] mb-4'>
          <AspectRatio
            ratio={390 / 94}
            className='relative rounded-lg h-[94px]'
          >
            <Image
              src={cover_list_by}
              alt={'cover_list_by'}
              fill
              sizes='auto'
              style={{ objectFit: 'cover' }}
              className=' rounded-t-lg'
            />
          </AspectRatio>
          {listingAgent.profile_image?.preview && (
            <div className='relative'>
              <Image
                src={listingAgent.profile_image?.preview}
                width={110}
                height={110}
                alt='profile_image'
                className=' absolute rounded-full aspect-square -top-10 left-3'
              />
            </div>
          )}
        </div>
        <div className='flex flex-col  relative gap-2 '>
          <TypographyH2 className='font-medium text-lg text-[#414042]'>
            {listingAgent.name}
          </TypographyH2>
          <TypographyH2 className='font-medium text-sm text-[#E0592A]'>
            {listingAgent.title.name}
          </TypographyH2>
          <TypographyH2 className='font-medium text-sm '>
            <span className='text-[#E0592A]'>Speaks</span> :{' '}
            {listingAgent.languages.map((lang) => lang.name).join(', ')}
          </TypographyH2>
        </div>
        <div className='flex flex-wrap gap-2'>
          <Button
            variant='primary-blue'
            className='font-normal gap-1 w-[80px] h-9 px-0'
          >
            <Phone size={14} /> Call
          </Button>
          <Button
            variant='primary-blue'
            className='font-normal gap-1 w-[80px] h-9 px-0'
          >
            <EnvelopeSimple size={14} /> Email
          </Button>
          <Button
            variant='outline'
            className='font-normal gap-1 grow h-9 px-0 border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-white'
          >
            <WhatsAppIcon /> WhatsApp
          </Button>
        </div>
        <div className='border-t border-[#ECECEC] gap-1 flex items-center justify-end py-3 px-2'>
          <Link href={'/'} className='text-sm font-normal'>
            View All Properties
          </Link>
          <ChevronRight size={16} />
        </div>
      </div>
    </div>
  );
};

export default ListingAgentCard;
