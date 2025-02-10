'use client';

import { settingsAtom, SettingsProps, Sizes } from '@/atoms/settingsAtoms';
import { Button } from '@/components/ui/button';
import { Chip } from '@/components/ui/chip';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { currencies } from '@/data';
import { langs } from '@/i18n.config';
import { cn } from '@/lib/utils';
import { CaretDown, GlobeHemisphereWest } from '@phosphor-icons/react';
import { useAtom, useAtomValue } from 'jotai';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const SettingsSelector = () => {
  // const { locale } = useParams<{ locale: string }>()
  const settings = useAtomValue(settingsAtom);
  const [open, setOpen] = useState(false);

  const languageName = langs.find(
    (lang) => lang.locale == settings?.locale
  )?.name;

  const currency = settings?.currency;

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='ghost' className='px-0 hover:bg-transparent'>
            <GlobeHemisphereWest size={20} />
            {languageName} / {currency?.toUpperCase()}
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
  const pathName = usePathname();
  const router = useRouter();

  const [settings, setSettings] = useAtom(settingsAtom);

  const [selectedLang, setSelectedLang] = useState<"en" | "ar" | "cn" | "de" | "fr" | "it" | "ru" | "tr">(settings?.locale);
  const [selectedCurrency, setSelectedCurrency] = useState(settings?.currency);
  const [selectedSize, setSelectedSize] = useState(settings?.size);

  const redirectedPathName = (locale: string) => {
    const segments = pathName.split('/');
    segments[1] = locale;
    router.push(segments.join('/'));
  };

  const handleSave = () => {
    setSettings((prev) => ({
      ...prev,
      locale: selectedLang,
      currency: selectedCurrency,
      size: selectedSize,
    }));
    redirectedPathName(selectedLang);
    onSave();
  };

  return (
    <>
      <div className='flex flex-col gap-2.5'>
        <div className='flex gap-1'>
          <Button
            className='grow text-xs font-medium'
            variant={selectedSize == Sizes.SQ_FT ? 'primary-blue' : 'outline'}
            onClick={() => setSelectedSize(Sizes.SQ_FT)}
            
          >
            SQ FT
          </Button>
          <Button
            className='grow text-xs font-medium'
            variant={selectedSize == Sizes.SQ_M ? 'primary-blue' : 'outline'}
            onClick={() => setSelectedSize(Sizes.SQ_M)}
          >
            SQ M
          </Button>
        </div>
        <div className='flex flex-col gap-1'>
          <Label className='text-xs font-medium'>Select Language</Label>
          <div className='flex gap-1 flex-wrap'>
            {langs.map((lang, index) => (
              <Button
                key={index}
                variant={
                  lang.locale == selectedLang ? 'primary-blue' : 'outline'
                }
                className={cn(
                  'h-[30px] w-[60px] text-xs font-normal transition-all',
                  {
                    'w-[73px]': lang.locale == selectedLang,
                  }
                )}
                onClick={() => setSelectedLang(lang.locale as "en" | "ar" | "cn" | "de" | "fr" | "it" | "ru" | "tr")}
              >
                {lang.name}
              </Button>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <Label className='text-xs font-medium'>Select Currency</Label>
          <div className='flex gap-1 flex-wrap'>
            {currencies.map((currency, index) => (
              <Chip
                key={index}
                variant={
                  currency.value == selectedCurrency ? 'default' : 'outline'
                }
                color={
                  currency.value == selectedCurrency
                    ? 'primary-blue'
                    : 'secondary'
                }
                className='w-[50px] justify-center cursor-pointer'
                onClick={() =>
                  setSelectedCurrency(
                    currency.value as SettingsProps['currency']
                  )
                }
              >
                {currency.label}
              </Chip>
            ))}
          </div>
        </div>
        <Button className='w-full' onClick={handleSave}>
          Save
        </Button>
      </div>
    </>
  );
};
