"use client";
import React, { useState, useEffect, useRef, RefObject } from "react";
import Image from "next/image";
import { Container } from "../ui/container";
import { Input } from "../ui/input";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Developer } from "@/types/HeroDeveloper";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { getDevelopers } from "@/services/developers";
import LoaderSpinner from "./Loader";
import { CustomPagination } from "./CustomPagination";
import { v4 as uuidv4 } from "uuid";
import HeroSearch from "./HeroSearch";
import MultiCheckboxSelect from "./MultiCheckboxSelect";

const HeroDeveloper: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [loading, setLoading] = useState(true);
  const localStorageKey = "developerPage";
  const [pageLoaded, setPageLoaded] = useState(false);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

        setDevelopers(req.items as Developer[]);

        if (typeof req.pages === "number") {
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

  const cityiesOptions = [
    { id: "dubai", name: "Dubai" },
    { id: "abudhabi", name: "Abu Dhabi" },
    { id: "sharjah", name: "Sharjah" },
  ];

  const filteredDevelopers = developers?.filter((developer) => {
    if (!developer) return false;
  
    const matchesSearch = developer.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
  
    const matchesCity =
      selectedCities.length === 0 ||
      selectedCities.some(
        (city) => city === developer?.city?.toLowerCase()
      );
  
    return matchesSearch && matchesCity;
  });
  

  const hasDevelopers = filteredDevelopers?.length > 0;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleToggleSelect = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleToggleCity = (locationId: string) => {
    setSelectedCities((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId]
    );
    setCurrentPage(1);
  };

  const handleImageClick = (developerId: string) => {
    router.push(`/developers/${developerId}?page=1`);
  };

  const searchInputs = (
    <>
      <div className="flex items-center gap-4 w-full">
        <div className="relative w-full md:w-[50%]">
          <Input
            type="text"
            placeholder="Search by Developer Name"
            className="w-full h-12 pl-10 bg-white border-0 border-r border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <MapPin className="absolute w-5 h-5 text-gray-400 transform -translate-y-9 left-[10px]" />
        </div>
        <div className="md:w-[30%] w-full h-12 bg-white border-0 rounded-md">
          <MultiCheckboxSelect
            options={cityiesOptions}
            selectedOptions={selectedCities}
            onToggleOption={handleToggleCity}
            placeholder="City"
            isMulti
            variant="primary"
            textAlign="left"
            styles="border-r border-gray-300 pr-1 rounded-none pr-4 text-[#414042]"
            isOpen={openIndex === 0}
            onToggle={() => handleToggleSelect(0)}
            ref={containerRef as RefObject<HTMLDivElement>}
          />
        </div>
        <div className="w-full md:w-[20%]">
          <Button className="h-12 px-8 text-white bg-[#2e325c] hover:bg-[#373b6a] w-full rounded-md">
            Search
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Container>
        <HeroSearch
          title="Meet Our Experts"
          backgroundImage="/images/herodeveloper.png"
          searchComponents={searchInputs}
        />
      </Container>
      <div className="px-4 py-2 bg-white">
        {loading ? (
          <div className="relative inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <LoaderSpinner />
          </div>
        ) : (
          <div className="grid max-w-[80%] mx-auto gap-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <AnimatePresence mode="wait">
              {filteredDevelopers?.map((developer) => (
                <motion.div
                  key={uuidv4()}
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
                    alt={(
                      developer.name?.replace(/\s+/g, "-") ||
                      "default-developer"
                    ).toLowerCase()}
                    width={120}
                    height={60}
                    className="w-full"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
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
