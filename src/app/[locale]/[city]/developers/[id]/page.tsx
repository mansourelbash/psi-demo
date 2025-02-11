"use client";
import DeveloperProfileProjects from "@/components/app/DeveloperProfileProjects";
import HeroCompanyCard from "@/components/app/HeroCompanyCard";
import Image from "next/image";
import React from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <HeroCompanyCard propertyId={parseInt(id)} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 h-auto container mt-[40px]">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <DeveloperProfileProjects propertyId={parseInt(id)} />
        </div>
        <div className="col-span-1">
          <div className="border-gray-300 h-auto md:h-[450px] rounded-[15px] border p-[20px] md:p-[30px]">
            <h4 className="text-center font-semibold text-[20px] md:text-[24px]">
              About Aldar 🏢
            </h4>

            <p className="mt-4 mb-4 text-[#414042] text-[16px] md:text-[15px]">
              Aldar Properties PJSC is the leading real estate developer and
              manager in the UAE with a diversified and sustainable operating
              model centred around two core businesses: Aldar Development and
              Aldar Investment.
            </p>
            <p className="mt-4 mb-4 text-[#414042] text-[16px] md:text-[15px]">
              Aldar Development is a master developer of integrated, livable,
              and thriving communities across Abu Dhabi’s most desirable
              destinations, including Yas Island, Saadiyat Island, Al Raha, and
              Reem Island.
            </p>
          </div>
          <div className="relative mt-[20px] rounded-[15px] overflow-hidden">
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
  );
};

export default Page;
