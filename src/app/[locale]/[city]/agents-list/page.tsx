"use client";
import { Container } from "@/components/ui/container";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { AgentCard } from "@/components/app/agents/AgentCard";
// import { agents } from "@/data/data";
import HeroSearch from "@/components/app/HeroSearch";
import MultiCheckboxSelect from "@/components/app/MultiCheckboxSelect";
import { motion, AnimatePresence } from "framer-motion";
import { CustomPagination } from "@/components/app/CustomPagination";
import { useRouter } from "next/navigation";
import debounce from "lodash.debounce";
import { useCallback } from "react";
import {
  OverlayScrollbarsComponent,
} from "overlayscrollbars-react";
import { API_URL } from "@/services/agents";
import { Agent } from "@/types/agent";
import "overlayscrollbars/overlayscrollbars.css";

const MeetOurTeam = () => {
  const languages = [
    { id: 18103, name: "Arabic" },
    { id: 18104, name: "English" },
    { id: 56262, name: "Spanish" },
    { id: 56261, name: "Russian" },
    { id: 56280, name: "Farsi" },
    { id: 56259, name: "German" },
    { id: 56267, name: "Dutch" },
    { id: 56258, name: "French" },
  ];
  
  const servicesType = [
    { id: 431, name: "Rent" },
    { id: 430, name: "Buy" },
  ];
  
  const groupedOptions = [
    {
      label: "Abu Dhabi",
      options: [
        { id: 30022, name: "Saadiyat Island" },
        { id: 28880, name: "Al Reem Island" },
        { id: 35395, name: "Yas Island" },
        { id: 35593, name: "Town Square Dubai" },
      ],
    },
    {
      label: "Dubai",
      options: [
        { id: 27268, name: "Palm Jumeirah District" },
        { id: 27298, name: "Downtown Dubai" },
        { id: 27292, name: "Dubai Creek" },
        { id: 27278, name: "Town Square Dubai" },
      ],
    },
  ];

  const normalizedGroupedOptions = groupedOptions.map(group => ({
    ...group,
    options: group.options.map(opt => ({
      ...opt,
      id: opt.id.toString(),
    }))
  }));
  

  const [currentPage, setCurrentPage] = useState(1);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchName, setSearchName] = useState("");
  const [suggestions, setSuggestions] = useState<Agent[]>([]);
  const [selectedService, setSelectedService] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>([]);
  const [selectedSpecialist, setSelectedSpecialist] = useState<string[]>([]);
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter();

  const suggestionsRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const element = suggestionsRef.current;
    if (element && !element.contains(event.target as Node)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchAgentSuggestions = async (query: string) => {
    try {
      const response = await fetch(
        `https://web.dev.psi-crm.com/api/agents?name=${query}`
      );
      const data = await response.json();
      setSuggestions(data.items);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const debouncedFetch = useCallback(
    debounce((query: string) => {
      if (query.length > 1) fetchAgentSuggestions(query);
      else setSuggestions([]);
    }, 300),
    []
  );

  useEffect(() => {
    if (document.activeElement?.tagName === "INPUT") {
      debouncedFetch(searchName);
    }
  }, [searchName]);
  

  const getAllAgentsFromApi = async (page: number) => {
    try {
      const isBuySelected = selectedService.includes("430");
      const isRentSelected = selectedService.includes("431");
  
      const queryParams = new URLSearchParams({
        page: String(page),
        per_page: "10",
        name: searchName,
      });
  
      if (selectedLanguage.length)
        queryParams.append("languages", selectedLanguage.join(","));
  
      if (selectedSpecialist.length)
        queryParams.append("communities", selectedSpecialist.join(","));
  
      if (isBuySelected) queryParams.append("sale_listing_agent", "true");
      if (isRentSelected) queryParams.append("lease_listing_agent", "true");
  
      const url = `${API_URL}/agents?${queryParams.toString()}`;
      const response = await fetch(url);
      const json = await response.json();
  
      setAgents(json.items);
      setTotalPages(json.pages);
    } catch (error) {
      console.error("Failed to fetch agents:", error);
    }
  };
  
  
  useEffect(() => {
    getAllAgentsFromApi(currentPage);
  }, [currentPage]);

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
    setIsClient(true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  const handleToggleSelect = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const handleImageClick = (agentId: string) => {
    router.push(`/agents-list/${agentId}`);
  };

  const handleSearch = () => {
    setCurrentPage(1); 
    getAllAgentsFromApi(1);
  };

  const handleToggleLanguage = (locationId: string) => {
    setSelectedLanguage((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId]
    );
    setCurrentPage(1);
  };
  const handleToggleService = (option: string) => {
    setSelectedService((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
    setCurrentPage(1);
  };

  const toggleOption = (optionId: string) => {
    setSelectedSpecialist((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
    setCurrentPage(1);
  };
 

  const handleSelect = (selectedAgent: { name: string }) => {
    setSearchName(selectedAgent.name);
    setSuggestions([]);
  };

  const searchInputs = (
    <>
      <div className="grid gap-4 md:grid-cols-5 items-center">

        <div className="relative border-r border-gray-300 pr-1">
          <MapPin className="absolute left-1 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by Agent Name"
            className="pl-8 border-0"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />

          {suggestions && suggestions.length > 0 && (
            <div
              className="custom-scrollbar absolute left-0 right-0 bg-white border border-gray-300 mt-1 rounded-md shadow-lg z-10"
              ref={suggestionsRef}
            >
              <OverlayScrollbarsComponent
                options={{ scrollbars: { autoHide: "leave" } }}
                className="max-h-60 bg-white"
              >
                {suggestions.map((agent) => (
                  <div
                    key={agent?.id}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      handleSelect(agent);
                      setSuggestions([]);
                    }}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium flex gap-3">
                        {agent?.name}</span>
                      {agent?.name && (
                        <span className="text-sm text-gray-500 mt-2">
                          {agent?.title?.name}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </OverlayScrollbarsComponent>
            </div>
          )}
        </div>

        <MultiCheckboxSelect
          options={servicesType.map(option => ({ ...option, id: option.id.toString() }))}
          selectedOptions={selectedService}
          onToggleOption={handleToggleService}
          placeholder="Services"
          isMulti
          variant="primary"
          textAlign="left"
          styles="border-r border-gray-300 pr-1 rounded-none pr-4 text-[#414042]"
          isOpen={openIndex === 0}
          onToggle={() => handleToggleSelect(0)}
          ref={containerRef as RefObject<HTMLDivElement>}
        />

        <MultiCheckboxSelect
          options={[]}
          selectedOptions={selectedSpecialist}
          onToggleOption={toggleOption}
          isMulti
          groups={normalizedGroupedOptions}
          placeholder="Area of Specialist"
          variant="primary"
          textAlign="left"
          styles="border-r border-gray-300 pr-1 rounded-none pr-4 text-[#414042]"
          isOpen={openIndex === 1}
          onToggle={() => handleToggleSelect(1)}
          ref={containerRef as RefObject<HTMLDivElement>}
        />

        <MultiCheckboxSelect
          options={languages.map(option => ({ ...option, id: option.id.toString() }))}
          selectedOptions={selectedLanguage}
          onToggleOption={handleToggleLanguage}
          placeholder="Language"
          isMulti
          variant="primary"
          textAlign="left"
          styles="border-r border-gray-300 pr-1 border-0 text-[#414042]"
          isOpen={openIndex === 2}
          onToggle={() => handleToggleSelect(2)}
          ref={containerRef as RefObject<HTMLDivElement>}
        />

        <div className="md:col-span-1 flex">
          <Button
            className="w-full bg-[#2A2852] hover:bg-[#2A2852]/90"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {isClient && (
        <>
          <Container>
            <HeroSearch
              title="Meet Our Experts"
              backgroundImage="/images/list-agents.png"
              searchComponents={searchInputs}
            />
          </Container>

          <Container>
            <div className="mx-auto px-2 py-2">
              <AnimatePresence>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
                  layout
                >
                  {agents.map((agent) => (
                    <motion.div
                      key={agent.id}
                      className="justify-center hover:cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      onClick={() =>
                        agent.id && handleImageClick(String(agent.id))
                      }
                      layout
                    >
                      <AgentCard agent={agent} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
            {agents && (
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                showFirstLast={true}
                maxVisiblePages={2}
                // isMobile={isMobile}
              />
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default MeetOurTeam;
