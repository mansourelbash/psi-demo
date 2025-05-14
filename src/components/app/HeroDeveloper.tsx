"use client";
import React, { useState, useRef, RefObject, useEffect } from "react";
import Image from "next/image";
import { Container } from "../ui/container";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Developer } from "@/types/HeroDeveloper";
import { useRouter } from "next/navigation";
import { getDevelopers } from "@/services/developers";
import LoaderSpinner from "./Loader";
import { CustomPagination } from "./CustomPagination";
import HeroSearch from "./HeroSearch";
import MultiCheckboxSelect from "./MultiCheckboxSelect";
import debounce from "lodash.debounce";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { CityIds } from "@/types/Shared";

const DEBOUNCE_DELAY = 300;

type Suggestion = {
  name: string | undefined;
  id: string | number;
};

const HeroDeveloper: React.FC = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const router = useRouter();
  const suggestionsRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("heroDeveloperState");
    if (stored) {
      const parsed = JSON.parse(stored);
      setSearchTerm(parsed.searchTerm ?? "");
      setSelectedCities(parsed.selectedCities ?? []);
      setCurrentPage(parsed.currentPage ?? 1);
    }
  }, []);

  useEffect(() => {
    const state = { searchTerm, currentPage };
    localStorage.setItem("heroDeveloperState", JSON.stringify(state));
  }, [searchTerm, currentPage]);

  const handleSearchSubmit = async () => {
    setLoading(true);
    try {
      const cityId = selectedCities.toString();
      const req = await getDevelopers(currentPage, 18, {
        query: searchTerm,
        cityId,
      });
      setDevelopers(req.items || []);
      setTotalPages(typeof req.pages === "number" ? req.pages : 1);
    } catch {
      setDevelopers([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearchSubmit();
  }, [currentPage]);

  const debouncedFetch = useRef(
    debounce(async (query: string) => {
      try {
        const result = await getDevelopers(1, 25, { query });
        const matchedSuggestions: Suggestion[] =
          result.items?.map((dev: Developer) => ({
            name: dev.name,
            id: dev.id,
          })) ?? [];
        setSuggestions(matchedSuggestions);
      } catch {
        setSuggestions([]);
      }
    }, DEBOUNCE_DELAY)
  ).current;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedFetch(value);
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

  const handleSelect = (item: Suggestion) => {
    setSearchTerm(item.name ?? "");
    setSuggestions([]);
    (document.activeElement as HTMLElement)?.blur();
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const citiesOptions = [
    { name: "Abu Dhabi", id: String(CityIds.ABU_DHABI) },
    { name: "Ajman", id: String(CityIds.AJMAN) },
    { name: "Al Ain", id: String(CityIds.AL_AIN) },
    { name: "Dubai", id: String(CityIds.DUBAI) },
    { name: "Fujairah", id: String(CityIds.FUJAIRAH) },
    { name: "Ras Al Khaimah", id: String(CityIds.RAS_AL_KHAIMAH) },
    { name: "Sharjah", id: String(CityIds.SHARJAH) },
    { name: "Umm Al Quwain", id: String(CityIds.UMM_AL_QUWAIN) },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchInputs = (
    <div className="flex flex-col md:flex-row items-center gap-4 w-full">
      <div className="relative w-full md:w-[50%]">
        <Input
          type="text"
          placeholder="Search by Developer Name"
          value={searchTerm}
          onChange={handleSearchChange}
          onBlur={() => setTimeout(() => setSuggestions([]), 150)}
        />
        {suggestions.length > 0 && (
          <div
            className="custom-scrollbar absolute left-0 right-0 bg-white border border-gray-300 mt-1 rounded-md shadow-lg z-10"
            ref={suggestionsRef}
          >
            <OverlayScrollbarsComponent
              element="span"
              options={{
                scrollbars: { autoHide: "leave", autoHideDelay: 500 },
              }}
              className="max-h-60 overflow-y-auto bg-white min-w-[180px]"
            >
              {suggestions.map((sug) => (
                <div
                  key={sug.id}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelect(sug)}
                >
                  <span className="font-medium">{sug.name}</span>
                </div>
              ))}
            </OverlayScrollbarsComponent>
          </div>
        )}
      </div>

      <div className="md:w-[30%] w-full">
        <MultiCheckboxSelect
          options={citiesOptions}
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
        <Button
          className="h-12 px-8 text-white bg-[#2e325c] hover:bg-[#373b6a] w-full rounded-md"
          onClick={handleSearchSubmit}
        >
          Search
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Container>
        <HeroSearch
          title="Developers in UAE"
          backgroundImage="/images/hero-developer.png"
          searchComponents={searchInputs}
        />
      </Container>

      <div className="px-2 py-2 bg-white">
        {loading ? (
          <div className="relative inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <LoaderSpinner />
          </div>
        ) : (
          <div className="grid max-w-[91%] mx-auto gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {developers.map((developer) => (
              <div
                key={developer.id}
                className="flex items-center justify-center p-2 hover:cursor-pointer border border-[#ECECEC] rounded-md h-[250px] transition-all hover:border-orange-500"
                onClick={() => handleImageClick(String(developer.id))}
              >
                <Image
                  src={developer.logo?.preview || "/images/media.jpg"}
                  alt={developer.name?.replace(/\s+/g, "-") || "developer"}
                  width={120}
                  height={60}
                  className="w-full"
                />
              </div>
            ))}
            {!loading && developers.length === 0 && (
              <div className="flex justify-center items-center text-center text-gray-500 py-8 col-span-full h-[500px]">
                No developers found for your search.
              </div>
            )}
          </div>
        )}
      </div>

      {developers.length > 0 && (
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          showFirstLast
          maxVisiblePages={2}
        />
      )}
    </>
  );
};

export default HeroDeveloper;
