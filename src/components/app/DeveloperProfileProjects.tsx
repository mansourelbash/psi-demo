"use client";

import {
  getDevelopersProfile,
  getProjectsDeveloper,
} from "@/services/developers";
import React, { useEffect, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { DeveloperProfileProjectsProps } from "@/types/HeroDeveloper";
import { useMediaQuery } from "usehooks-ts";
import MultiCheckboxSelect from "./MultiCheckboxSelect";
import LoaderSpinner from "./Loader";
import { CustomPagination } from "./CustomPagination";
import { useRouter, useSearchParams } from "next/navigation";
import { sectionRefAtom } from "@/atoms/settingsAtoms";
import { useAtom } from "jotai";
import { PropertyListModel } from "@/types/Property";
import { capitalizeWords } from "@/lib/capitlizeWords";
const itemsPerPage = 6;

interface Location {
  lat?: number;
  lng?: number;
}
interface Project extends PropertyListModel {
  id: number;
  location: Location;
  handover_date: string | null;
}
interface ProfileData {
  name: string;
}

const DeveloperProfileProjects: React.FC<DeveloperProfileProjectsProps> = ({
  propertyId,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [sectionRef] = useAtom(sectionRefAtom);
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [searchParams]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const handleToggleSelect = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
  const [selectedStatues, setSelectedStatues] = useState<string>("ready");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const handleToggleLocation = (locationId: string) => {
    setSelectedLocations((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId]
    );
  };

  const handleToggleStatues = (statusId: string) => {
    setSelectedStatues(statusId.toString());
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const developerProjectsData = await getProjectsDeveloper(
          propertyId,
          currentPage,
          itemsPerPage
        );

        const developerProfileData = await getDevelopersProfile(propertyId);
        if (developerProfileData) {
          setProfileData(developerProfileData);
        }
        if (Array.isArray(developerProjectsData.items)) {
          setProjects(developerProjectsData.items as Project[]);
        } else {
          setProjects([]);
        }

        setTotalPages(
          developerProjectsData.pages !== undefined
            ? developerProjectsData.pages
            : 1
        );
      } catch (error) {
        console.error("Error fetching developer projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propertyId, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    router.replace(`?page=${newPage}`, { scroll: false });
  };

  return (
    <>
      <div
        ref={sectionRef}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6"
      >
        <h1 className="text-lg md:text-xl font-semibold text-wrap">
          Properties Developed By {capitalizeWords(profileData?.name)}
        </h1>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-2">
          <div className="w-full md:w-auto">
            <MultiCheckboxSelect
              options={locations}
              selectedOptions={selectedLocations}
              onToggleOption={handleToggleLocation}
              title="Choose a Location"
              isMulti={true}
              variant="default"
              isOpen={openIndex === 0}
              onToggle={() => handleToggleSelect(0)}
            />
          </div>

          <div className="w-full md:w-auto">
            <MultiCheckboxSelect
              options={Statues}
              selectedOptions={selectedStatues}
              onToggleOption={handleToggleStatues}
              title="Status"
              isMulti={false}
              variant="outlined"
              isOpen={openIndex === 1}
              onToggle={() => handleToggleSelect(1)}
            />
          </div>
        </div>
      </div>

      <div className="h-full">
        {loading ? (
          <LoaderSpinner />
        ) : projects.length === 0 ? (
          <div className="text-center text-gray-500 text-base sm:text-lg h-[300px] sm:h-[400px] flex justify-center items-center px-4">
            No projects found.
          </div>
        ) : (
          <>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <div key={index}>
                  <ProjectCard project={project} useResponsive={true} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                showFirstLast={true}
                maxVisiblePages={2}
                isMobile={isMobile}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DeveloperProfileProjects;
