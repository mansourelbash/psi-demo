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
      <Container className='min-h-[51px] flex items-center justify-center sm:justify-between'>
        <div className='flex gap-2 order-1 sm:order-none'>
          <SettingsSelector />
          <CitySelector />
        </div>

        <div className='flex gap-6 items-center text-sm font-medium order-3 sm:order-none'>
          <a href='tel:600 548 200' className='flex gap-1 items-center'>
            <Phone size={18} /> <span>600 548 200</span>
          </a>
          <a href='https://wa.me/600548200' className='flex gap-1 items-center' target="_blank" rel="noopener noreferrer">
            <WhatsappLogo size={18} /> <span>600 548 200</span>
          </a>
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


        <div className='flex gap-1 mt-2 sm:mt-0'>
          <Button className='rounded-full h-[43px] text-sm hidden sm:block'>List your Property</Button>
          <Button className='rounded-full size-[43px]' size='icon'>
            <UserCircle className='size-[30px]' />
          </Button>
        </div>
      </Container>
    </header>
  );
};
