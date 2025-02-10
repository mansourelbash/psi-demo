import { TypographyH2 } from '@/components/ui/typography';
import Image from 'next/image';
import ExampleQRCode from '@/assets/icons/regulatory-qr-code.png';
const RegulatoryInformation = () => {
  return (
    <div className='w-full border border-[#ECECEC] rounded-[15px] p-[30px] flex gap-5 flex-col'>
      <TypographyH2 className='text-[#414042] text-2xl font-medium'>
        Regulatory Information :
      </TypographyH2>
      <div className='flex justify-center items-center gap-2'>
        <Image
          src={ExampleQRCode}
          alt='example'
          width={100}
          className=' aspect-square'
        />
        <div className='flex flex-col gap-2'>
          <TypographyH2 className='text-lg text-[#414042}'>
            DLD Permit Number:
          </TypographyH2>
          <TypographyH2 className='text-sm text-[#E0592A]'>
            69235021356
          </TypographyH2>
          <TypographyH2 className='text-[7px] text-[#414042]'>
            This property listing has been reviewed and verified by Dubai Land
            Department
          </TypographyH2>
        </div>
      </div>
    </div>
  );
};
export default RegulatoryInformation;
