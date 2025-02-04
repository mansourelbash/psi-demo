'use client'
import React, { useState } from 'react';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import Image from 'next/image';
import { Container } from '../ui/container';
import { Input } from '../ui/input';
import { MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '../ui/button';
import { HeroDeveloperProps } from '@/types/HeroDeveloper';

const HeroDeveloper: React.FC<HeroDeveloperProps> = ({ developers }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>(''); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const normalizeCity = (city: string) => city.toLowerCase();

  const filteredDevelopers = developers.filter((developer) => {
    const matchesSearch = developer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity ? normalizeCity(developer.city) === selectedCity : true;
    return matchesSearch && matchesCity;
  });

  const totalPages = Math.ceil(filteredDevelopers.length / itemsPerPage);

  const currentDevelopers = filteredDevelopers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Container className="overflow-hidden">
        <AspectRatio ratio={16 / 6} className="flex items-center h-[625px]">
          <Image
            src="/images/herodeveloper.png"
            alt="Hero"
            fill
            className="object-cover absolute top-0 left-0 -z-10"
          />
          <div className="space-y-12 grow">
            <h1 className="text-[44px] font-bold text-white text-center">
              Developers in UAE
            </h1>
            <div className="flex flex-col items-center gap-5">
              <div className="bg-white rounded-[24px] max-w-[1150px] w-[95%] py-6 flex items-center justify-center">
                <div className="w-[1100px] space-y-2.5">
                  <div className="flex flex-col gap-4 md:flex-row">
                    <div className="flex-1 relative">
                      <Input
                        type="text"
                        placeholder="Search by Developer Name"
                        className="w-full h-12 pl-10 bg-white border-0"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                      <MapPin className="absolute w-5 h-5 text-gray-400 transform -translate-y-9 left-[10px]" />
                    </div>
                    <Select onValueChange={(value) => setSelectedCity(value)}>
                      <SelectTrigger className="h-12 bg-white border-0 w-full md:w-[200px]">
                        <SelectValue placeholder="City" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dubai">Dubai</SelectItem>
                        <SelectItem value="abudhabi">Abu Dhabi</SelectItem>
                        <SelectItem value="sharjah">Sharjah</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="h-12 px-8 text-white bg-[#2e325c] hover:bg-[#373b6a]">
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AspectRatio>
      </Container>

      <div className="px-4 py-8 bg-white">
        <div className="grid max-w-7xl grid-cols-2 gap-8 mx-auto md:grid-cols-4 lg:grid-cols-4">
          <AnimatePresence>
            {currentDevelopers.map((developer) => (
              <motion.div
                key={developer.logo}
                className="flex items-center justify-center p-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={developer.logo}
                  alt={developer.name.replace(/\s+/g, '-')}
                  width={120}
                  height={60}
                  className="w-full"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 py-8 bg-white">
        <Button
          variant="outline"
          className="text-gray-500"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            variant="outline"
            className={currentPage === index + 1 ? 'bg-[#2e325c] text-white' : 'text-gray-500'}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          className="text-gray-500"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default HeroDeveloper;
