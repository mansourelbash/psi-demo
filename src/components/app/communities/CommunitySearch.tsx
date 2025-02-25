'use client';

import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';
import { AppSelect } from '../AppSelect';
import { Button } from '@/components/ui/button';
import { LookupModel } from '@/types/Lookup';
import { FC } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import queryString from 'query-string';
import { useState } from 'react';

type Props = {
  propertyTypes: LookupModel[];
};
const CommunitySearch: FC<Props> = ({ propertyTypes }) => {
  const router = useRouter();
  const param = useSearchParams();
  const currenParams: Record<string, string> = {};
  const pathname = usePathname();
  const [unitType, setUnitType] = useState<string>(
    param.get('unit_type') ?? ''
  );
  const [searchName, setSearchName] = useState<string>(param.get('name') ?? '');
  function submitHandler(): void {
    param.entries().forEach(([key, value]) => {
      currenParams[key] = value;
    });
    router.push(
      pathname +
        '?' +
        queryString.stringify(
          { ...currenParams, unit_type: unitType, name: searchName },
          { skipNull: true, skipEmptyString: true }
        )
    );
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
      <div className='relative border-r border-gray-300 pr-1 md:col-span-3'>
        <MapPin className='absolute left-1 top-2.5 h-5 w-5 text-muted-foreground' />
        <Input
          placeholder='Search by Community Name'
          className='pl-8 border-0'
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>
      <div>
        <AppSelect
          initText='Property Type'
          data={propertyTypes.map((type) => ({
            label: type.name,
            value: type.id.toString(),
          }))}
          searchable={false}
          placeholder='Property Type'
          value={unitType}
          onChange={(value) => setUnitType(value)}
        />
      </div>
      <Button className='bg-[#2C2D65]' onClick={submitHandler}>
        Search
      </Button>
    </div>
  );
};
export default CommunitySearch;
