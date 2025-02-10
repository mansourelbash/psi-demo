"use client";

import { getProjectsDeveloper } from "@/services/developers";
import React, { useEffect, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { DeveloperProfileProjectsProps } from "@/types/HeroDeveloper";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "../ui/button";
import MultiCheckboxSelect from "./MultiCheckboxSelect";
import LoaderSpinner from "./Loader";
import { CustomPagination } from "./CustomPagination";
import { useRouter, useSearchParams } from "next/navigation";


const itemsPerPage = 6;

const DeveloperProfileProjects: React.FC<DeveloperProfileProjectsProps> = ({
  propertyId,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;

  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [searchParams]);

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

  const [selectedLocations, setSelectedLocations] = useState<string[]>(["dubai"]);
  const [selectedStatues, setSelectedStatues] = useState<string>("ready");

  const handleToggleLocation = (locationId: string) => {
    setSelectedLocations((prev) =>
      prev.includes(locationId) ? prev.filter((id) => id !== locationId) : [...prev, locationId]
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

        setProjects(developerProjectsData.items || []);
        setTotalPages(developerProjectsData.pages || 1);
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
      <div className="flex items-start justify-between mb-8 md:flex-row xs:flex-col">
        <h1 className="text-2xl font-semibold">Properties Developed By Aldar</h1>
        <div className="flex gap-2 lg:w-[400px]">
          <div className="relative w-full max-w-md">
            <MultiCheckboxSelect
              options={locations}
              selectedOptions={selectedLocations}
              onToggleOption={handleToggleLocation}
              title="Choose a Location"
              isMulti={true}
              variant="default"
            />
          </div>

          <div className="relative w-full max-w-md">
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

      <div className="h-full">
        {loading ? (
          <LoaderSpinner />
        ) : projects.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">No projects found.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project, index) => (
                <div key={index}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                showFirstLast={true}
                maxVisiblePages={5}
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
