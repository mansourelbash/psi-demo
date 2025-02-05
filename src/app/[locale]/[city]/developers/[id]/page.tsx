'use client'
import HeroCompanyCard from '@/components/app/HeroCompanyCard'
import MultiCheckboxSelect from '@/components/app/MultiCheckboxSelect'
import Image from 'next/image'
import React, { useState } from 'react'

const page = () => {
  const locations = [
    { id: "abu-dhabi", name: "Abu Dhabi" },
    { id: "dubai", name: "Dubai" },
    { id: "sharjah", name: "Sharjah" },
    { id: "al-ain", name: "Al Ain" },
    { id: "ras-al-khaimah", name: "Ras Al Khaimah" },
  ];

  const Statues = [
    { id: "ready", name: "Ready" },
    { id: "offplan", name: "Off Plan" },
  ];

  const [selectedLocations, setSelectedLocations] = useState<string[]>([
    "dubai",
  ]);
  const [selectedStatues, setSelectedStatues] = useState<string[]>([
    "ready",
  ]);

  const handleToggleLocation = (locationId: string) => {
    setSelectedLocations((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId]
    );
  };

  const handleToggleStatues = (statusId: string) => {
    setSelectedStatues(statusId);
  };
  return (
    <div>
      <HeroCompanyCard />

      <div className="grid grid-cols-4 gap-8 h-screen container mt-[40px]">
        <div className="col-span-3">
        <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-semibold">Properties Developed By Aldar</h1>
        <div className="flex gap-2 w-[30%]">
          <MultiCheckboxSelect
        options={locations}
        selectedOptions={selectedLocations}
        onToggleOption={handleToggleLocation}
        title="Choose a Location"
        isMulti={true}
        variant="default"
      />

      <MultiCheckboxSelect
        options={Statues}
        selectedOptions={selectedStatues}
        onToggleOption={handleToggleStatues}
        title="Statues"
        isMulti={false}
        variant="outlined"
      />
        </div>
      </div>
        </div>
        <div className="col-span-1">
          <div className='border-gray-300 h-[450px] rounded-[15px] border p-[30px]'>
            <h4 className='text-center font-semibold text-[24px]'>About Aldar 🏢</h4>

            <p className='mt-4 mb-4 text-[#414042] text-[18px]'>
            Aldar Properties PJSC is the leading real estate developer and manager in the UAE with a diversified and sustainable operating model centred around two core businesses: Aldar Development and Aldar Investment.
            </p>
            <p className='mt-4 mb-4 text-[#414042] text-[18px]'>
            Aldar Development is a master developer of integrated, livable, and thriving communities across Abu Dhabi’s most desirable destinations, including Yas Island, Saadiyat Island, Al Raha, and Reem Island. 
            </p>
          </div>
          <div className='relative mt-[20px] rounded-[15px] overflow-hidden'>
          <Image
            src="/images/book-now.jpg"
            alt="Yas Riva Property"
            width={800}
            height={1000}
            className="w-full"
            priority
          />

          </div>
        </div>
      </div>

    </div>
  )
}

export default page