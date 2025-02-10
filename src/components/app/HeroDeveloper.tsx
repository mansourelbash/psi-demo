"use client";
import React, { useState, useEffect } from "react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { Container } from "../ui/container";
import { Input } from "../ui/input";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Developer, OptionType } from "@/types/HeroDeveloper";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const Select = dynamic(() => import("react-select"), { ssr: false });
import {MultiValue } from "react-select";
import { useMediaQuery } from "react-responsive";
import { getDevelopers } from "@/services/developers";
import LoaderSpinner from "./Loader";
import { CustomPagination } from "./CustomPagination";

const HeroDeveloper: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCities, setSelectedCities] = useState<MultiValue<OptionType>>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [loading, setLoading] = useState(true);
  const localStorageKey = "developerPage";
  const [pageLoaded, setPageLoaded] = useState(false); // new state variable


  useEffect(() => {
    const savedPage = localStorage.getItem(localStorageKey);
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10));
    }
    setPageLoaded(true); 
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, currentPage.toString());
  }, [currentPage]);

  useEffect(() => {
    if (!pageLoaded) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const req = await getDevelopers(currentPage, 18);
        // Ensure the response has the correct structure.
        // Adjust if the actual response uses a different key (like 'developers').
        setDevelopers(req.items as Developer[]);  // Assuming 'developers' is the correct key
    
        if (typeof req.pages === 'number') {
          setTotalPages(req.pages);
        } else {
          setTotalPages(1);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [currentPage, pageLoaded]);

  const options: OptionType[] = [
    { value: "dubai", label: "Dubai" },
    { value: "abudhabi", label: "Abu Dhabi" },
    { value: "sharjah", label: "Sharjah" },
  ];

  const filteredDevelopers = developers?.filter((developer) => {
    if (!developer) return false;
    const matchesSearch = developer.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCity =
      selectedCities.length === 0 ||
      selectedCities.some(
        (city) => city.value === developer?.city?.toLowerCase()
      );
    return matchesSearch && matchesCity;
  });

  const hasDevelopers = filteredDevelopers?.length > 0;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleSelectChange = (newValue: unknown)  => {
    const selectedOptions = newValue as MultiValue<OptionType>;
    setSelectedCities(selectedOptions);
    setCurrentPage(1);
  };

  const handleImageClick = (developerId: string) => {
    router.push(`/developers/${developerId}`);
  };

  return (
    <>
      <Container className="overflow-hidden">
        <AspectRatio
          ratio={isMobile ? 1 : 16 / 6}
          className="flex items-center relative"
        >
          <Image
            src="/images/herodeveloper.png"
            alt="Hero"
            fill
            className="object-cover absolute top-0 left-0 -z-10"
          />
          <div className="space-y-12 grow">
            <h1 className="text-[32px] md:text-[44px] font-bold text-white text-center">
              Developers in UAE
            </h1>
            <div className="flex flex-col items-center gap-5">
              <div className="bg-white rounded-[24px] w-[90%] max-w-5xl py-6 flex items-center justify-center">
                <div className="w-[90%] space-y-2.5">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative w-full md:w-[65%]">
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
                    <div className="w-full md:w-[35%]">
                      <Select
                        isMulti
                        options={options}
                        value={selectedCities}
                        onChange={handleSelectChange}
                        placeholder="Property Type"
                        className="basic-multi-select"
                        classNamePrefix="select"
                      />
                    </div>{" "}
                    <Button className="h-12 px-8 text-white bg-[#2e325c] hover:bg-[#373b6a] w-full md:w-[25%]">
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
        {loading ? (
          <div className="relative inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <LoaderSpinner />
          </div>
        ) : (
          <>
            <div className="grid max-w-[80%] mx-auto gap-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              <AnimatePresence mode="wait">
                {filteredDevelopers?.map((developer) => (
                  <motion.div
                    key={developer.name}  
                    className="flex items-center justify-center p-4 hover:cursor-pointer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={() =>
                      developer.id && handleImageClick(String(developer.id))
                    }
                  >
                    <Image
                      src={developer.logo?.preview || "/images/media.jpg"}
                      alt={(developer.name?.replace(/\s+/g, "-") || "default-developer").toLowerCase()}
                      width={120}
                      height={60}
                      className="w-full"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
      {hasDevelopers && (
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
  );
};

export default HeroDeveloper;
