"use client";
import React, { useState, useEffect } from "react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { Container } from "../ui/container";
import { Input } from "../ui/input";
import { MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { HeroDeveloperProps, OptionType } from "@/types/HeroDeveloper";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
const Select = dynamic(() => import("react-select"), { ssr: false });
import { ActionMeta, OnChangeValue, MultiValue } from "react-select";
import { useMediaQuery } from "react-responsive";
import { getDevelopers } from "@/services/developers";

const HeroDeveloper: React.FC<HeroDeveloperProps> = () => {
  const [developers, setDevelopers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCities, setSelectedCities] = useState<MultiValue<OptionType>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    const fetchData = async () => {
      const req = await getDevelopers(currentPage, 18);
      setDevelopers(req.items);
      setTotalPages(req.pages);
    };

    fetchData();
  }, [currentPage]);

  const options: OptionType[] = [
    { value: "dubai", label: "Dubai" },
    { value: "abudhabi", label: "Abu Dhabi" },
    { value: "sharjah", label: "Sharjah" },
  ];

  const filteredDevelopers = developers.filter((developer) => {
    if (!developer) return false;
    const matchesSearch = developer.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCity =
      selectedCities.length === 0 ||
      selectedCities.some((city) => city.value === developer.city.toLowerCase());
    return matchesSearch && matchesCity;
  });

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleSelectChange = (
    selectedOptions: OnChangeValue<OptionType, true>,
    actionMeta: ActionMeta<OptionType>
  ) => {
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
                        placeholder="Select Cities"
                        className="basic-multi-select"
                        classNamePrefix="select"
                      />
                    </div>

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
        <div className="grid max-w-[80%] mx-auto gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-6">
          <AnimatePresence mode="wait">
            {filteredDevelopers.map((developer) => (
              <motion.div
                key={developer.id}
                className="flex items-center justify-center p-4 hover:cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleImageClick(developer.name)}
              >
                <Image
                  src={developer.logo?.preview || "/images/media.jpg"}
                  alt={developer.name.replace(/\s+/g, "-")}
                  width={120}
                  height={60}
                  className="w-full"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 py-8 bg-white">
        <Button
          variant="outline"
          className="text-gray-500 px-4 py-2"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>

        {currentPage > 3 && (
          <>
            <Button
              variant="outline"
              className={`px-4 py-2 ${currentPage === 1 ? "bg-[#2e325c] text-white" : "text-gray-500"}`}
              onClick={() => handlePageChange(1)}
            >
              1
            </Button>
            {currentPage > 4 && <span className="text-gray-500">...</span>}
          </>
        )}

        {Array.from({ length: totalPages }, (_, index) => index + 1)
          .filter(
            (page) =>
              page === 1 ||
              page === totalPages ||
              Math.abs(currentPage - page) <= (isMobile ? 1 : 2)
          )
          .map((page) => (
            <Button
              key={page}
              variant="outline"
              className={`px-4 py-2 ${currentPage === page ? "bg-[#2e325c] text-white" : "text-gray-500"}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}

        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && <span className="text-gray-500">...</span>}
            <Button
              variant="outline"
              className={`px-4 py-2 ${currentPage === totalPages ? "bg-[#2e325c] text-white" : "text-gray-500"}`}
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}

        <Button
          variant="outline"
          className="text-gray-500 px-4 py-2"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default HeroDeveloper;
