'use client';

import { useAtom } from 'jotai';
import { Container } from '@/components/ui/container';
import { SettingsSelector } from './SettingsSelector';
import { CitySelector } from './CitySelector';
import { Phone, UserCircle, WhatsappLogo } from '@phosphor-icons/react';
import Image from 'next/image';
import { List, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isMobileMenuOpenAtom } from '@/atoms/settingsAtoms';
import { Nav } from './Nav';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useAtom(isMobileMenuOpenAtom);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className='lg:border-b lg:space-y-2.5 py-4 lg:bg-transparent md:bg-transparent bg-[#051831] px-3 sm:border-0'>
        <Container className='min-h-[51px] items-center justify-center sm:justify-between hidden lg:flex'>
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
            className='hidden lg:block'
          />

          {/* Mobile Menu Toggle Button with Animation */}
          <button
            className="sm:hidden p-3.5 flex gap-1 items-center text-sm font-medium text-white lg:text-black"
            onClick={toggleMobileMenu}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMobileMenuOpen ? 'close' : 'open'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <List size={24} />}
              </motion.div>
            </AnimatePresence>
          </button>

          <div className="hidden sm:block">
            <Nav />
          </div>

          <Image
            src='/iconpsi.svg'
            alt='white logo image'
            width={50}
            height={30}
            className='lg:hidden sm:hidden md:hidden xs:block'
          />

          <div className='flex gap-1 mt-2 sm:mt-0'>
            <Button className='rounded-full h-[43px] text-sm hidden sm:block'>List your Property</Button>
            <Button className='rounded-full size-[43px]' size='icon'>
              <UserCircle className='size-[30px]' />
            </Button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="sm:hidden fixed top-[80px] left-0 w-full h-full bg-white shadow-lg z-50"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Nav />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
