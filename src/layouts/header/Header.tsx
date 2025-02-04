'use client';

import { Container } from '@/components/ui/container';
import { SettingsSelector } from './SettingsSelector';
import { CitySelector } from './CitySelector';
import { Phone, UserCircle, WhatsappLogo } from '@phosphor-icons/react';
import Image from 'next/image';
import { Nav } from './Nav';
import { Button } from '@/components/ui/button';

export const Header = () => {
  return (
    <header className='border-b space-y-2.5 py-4'>
      <Container className='min-h-[51px] flex items-center'>
        <div className='flex justify-between grow'>
          <div className='flex gap-2'>
            <SettingsSelector />
            <CitySelector />
          </div>
          <div className='flex gap-6 items-center text-sm font-medium'>
            <a href='tel:600 548 200' className='flex gap-1 items-center'>
              <Phone size={18} /> <span>600 548 200</span>
            </a>
            <a href='tel:600 548 200' className='flex gap-1 items-center'>
              <WhatsappLogo size={18} /> <span>600 548 200</span>
            </a>
          </div>
        </div>
      </Container>
      <Container className='flex flex-wrap items-center justify-between'>
        <Image
          src='/logo.svg'
          alt='Abu Dhabi Real Estate'
          width={61}
          height={50}
        />
        <Nav />
        <div className='flex gap-1'>
          <Button className='rounded-full h-[43px]'>List your Property</Button>
          <Button className='rounded-full size-[43px]' size='icon'>
            <UserCircle className='size-[30px]' />
          </Button>
        </div>
      </Container>
    </header>
  );
};
