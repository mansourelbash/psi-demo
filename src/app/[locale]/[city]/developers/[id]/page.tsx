"use client";
import DeveloperProfileProjects from "@/components/app/DeveloperProfileProjects";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AboutDeveloper from "@/components/app/AboutDeveloper";
import { Button } from "@/components/ui/button";
import ProfileCard from "@/components/app/ProfileCard";
import { getDevelopersProfile } from "@/services/developers";
import { useAtom } from "jotai";
import { sectionRefAtom } from "@/atoms/settingsAtoms";
import { DeveloperProfileModel } from "@/types/HeroDeveloper";

const Page = () => {
  const { id } = useParams<{ id: string }>();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [sectionRef] = useAtom(sectionRefAtom);
  const [propertyProfile, setPropertyProfile] = useState<DeveloperProfileModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const developerProjectsData = await getDevelopersProfile(parseInt(id));
        if (!developerProjectsData) {
          throw new Error("Developer data not found");
        }

        setPropertyProfile({
          name: developerProjectsData.name || "Unknown",
          properties_count: developerProjectsData.properties_count || 0,
          founded: developerProjectsData.founded || 2000,
          logo: developerProjectsData.logo || {
            preview: "/images/developers/default-logo.png",
          },
          phone: developerProjectsData.phone || "",
          overview: developerProjectsData.overview || "",
        });
      } catch (error) {
        console.error("Error fetching developer projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleScroll = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const capitalizeWords = (str: string) => {
    return str
      .split(' ')
      .map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(' '); 
  };



  return (
    <div>
      <ProfileCard
        id={id}
        setIsOpen={setIsModalOpen}
        isOpen={isModalOpen}
        cover="/images/hero-developer-section.png"
        imageSrc={propertyProfile?.logo?.preview ?? "/images/developers/aldar-logo.png"}
        className="xs:overflow-show rounded-none xl:rounded-[20px] lg:rounded-[20px] md:rounded-[20px] xs:bg-mob-custom"
        loading={loading}
      >
        <div>
          <h2 className="text-2xl font-medium text-white xs:text-black">
            {capitalizeWords(propertyProfile?.name || "Aldar Properties PJSC")}
          </h2>

          <div className="space-y-1 text-sm text-white/80 xs:text-black">
            <p>Properties: {propertyProfile?.properties_count ?? 0}</p>
            <p>Founded in: {propertyProfile?.founded} y.</p>
          </div>

          <div className="flex flex-wrap gap-3 mt-2">
            <Button
              onClick={handleScroll}
              variant="outline"
              className="h-8 border-white/20 bg-transparent text-black bg-[#FFFFFF] hover:bg-slate-100 xs:bg-blue-custom"
            >
              Find Property
            </Button>
            <Button className="h-8 bg-[#FF5A3D] text-white hover:bg-[#FF5A3D]/90">
              <Image
                src="/visiticon.svg"
                width={20}
                height={20}
                alt="visit icon"
              />{" "}
              Visit Website
            </Button>
          </div>
        </div>
      </ProfileCard>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 h-auto container mt-[40px] mb-5">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <DeveloperProfileProjects propertyId={parseInt(id)} />
        </div>
        <div className="col-span-1">
          <AboutDeveloper propertyId={parseInt(id)} />
          <div className="p-1 relative mt-5 rounded-[15px] overflow-hidden w-full max-w-full sm:max-w-full md:max-w-full lg:max-w-full mx-auto">
            <Image
              src="/images/book-now.jpg"
              alt="Yas Riva Property"
              width={800}
              height={1000}
              className="w-full h-auto object-cover rounded-[15px]"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
