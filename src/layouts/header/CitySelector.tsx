'use client';

import { dictionaryAtom, settingsAtom } from '@/atoms/settingsAtoms';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cities } from '@/data';
import { CityIds } from '@/types/Shared';
import { CaretDown } from '@phosphor-icons/react';
import { useAtom, useAtomValue } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export const CitySelector = () => {
  const settings = useAtomValue(settingsAtom);
  const [open, setOpen] = useState(false);

  const city = CityIds[settings?.city];

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='ghost' className='hover:bg-transparent'>
            {city}
            <CaretDown size={12} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='max-w-[295px] py-5 px-2.5 space-y-3'
          align='start'
        >
          <SettingsPopoverContent onSave={() => setOpen(false)} />
        </PopoverContent>
      </Popover>
    </>
  );
};

const SettingsPopoverContent = ({ onSave }: { onSave: () => void }) => {
  const dictionary = useAtomValue(dictionaryAtom)

  const pathName = usePathname();
  const router = useRouter();
  const [settings, setSettings] = useAtom(settingsAtom);

  const selectedCity = settings.city;
  const redirectedPathName = (city: string) => {
    const segments = pathName.split('/');
    segments[2] = city;
    router.push(segments.join('/'));
  };

  return (
    <>
      <div className='flex flex-col gap-2.5'>
        <div className='flex flex-col gap-2.5'>
          <Label className='font-medium'>{dictionary!.SELECT_CITY}</Label>
          <div className='flex flex-col gap-1 flex-wrap'>
            {cities.map((city, index) => (
              <Button
                key={index}
                variant={
                  city.value == selectedCity ? 'primary-blue' : 'outline'
                }
                className='text-xs font-medium transition-all'
                onClick={() => {
                  setSettings((prev) => ({
                    ...prev,
                    city: city.value,
                  }));
                  redirectedPathName(city.key);
                  onSave();
                }}
              >
                {city.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
