"use client";
import { Container } from "@/components/ui/container";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { AgentCard } from "@/components/app/agents/AgentCard";
import { agents } from "@/data/data";
import HeroSearch from "@/components/app/HeroSearch";
import MultiCheckboxSelect from "@/components/app/MultiCheckboxSelect";
import { motion, AnimatePresence } from "framer-motion";
import { CustomPagination } from "@/components/app/CustomPagination";
import { useRouter } from "next/navigation";
const MeetOurTeam = () => {
  const languages = [
    { id: "arabic", name: "Arabic" },
    { id: "english", name: "English" },
    { id: "spanish", name: "Spanish" },
    { id: "french", name: "French" },
    { id: "german", name: "German" },
    { id: "italian", name: "Italian" },
  ];

  const servicesType = [
    { id: "sales", name: "Sales" },
    { id: "rent", name: "Rent" },
    { id: "buy", name: "Buy" },
  ];

  const groupedOptions = [
    {
      label: "Abu Dhabi",
      options: [
        { id: "saadiyat-island", name: "Saadiyat Island" },
        { id: "al-reem-island", name: "Al Reem Island" },
        { id: "yas-island", name: "Yas Island" },
        { id: "town-square-dubai-abu-dhabi", name: "Town Square Dubai" },
      ],
    },
    {
      label: "Dubai",
      options: [
        { id: "palm-jumeirah", name: "Palm Jumeirah" },
        { id: "downtown-dubai", name: "Downtown Dubai" },
        { id: "dubai-creek", name: "Dubai Creek" },
        { id: "town-square-dubai", name: "Town Square Dubai" },
      ],
    },
  ];


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchName, setSearchName] = useState("");
  const [selectedService, setSelectedService] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>([]);
  const [selectedSpecialist, setSelectedSpecialist] = useState<string[]>([]);
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter();
  const agentsPerPage = 10;
  const startIndex = (currentPage - 1) * agentsPerPage;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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

  const handleToggleLanguage = (locationId: string) => {
    setSelectedLanguage((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId]
    );
    setCurrentPage(1)
  };
  const handleToggleService = (locationId: string) => {
    setSelectedService((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId]
    );
    setCurrentPage(1)
  };

  const toggleOption = (optionId: string) => {
    console.log(optionId, "optionId");
    setSelectedSpecialist((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
    setCurrentPage(1)
  };

  const filteredAgents = agents.filter((agent) => {
    const matchesName = agent.name
      .toLowerCase()
      .includes(searchName.toLowerCase());

    const matchesService =
      selectedService.length === 0 ||
      selectedService.some((service) =>
        agent.services.some((s) => s.toLowerCase() === service.toLowerCase())
      );

    const matchesLanguage =
      selectedLanguage.length === 0 ||
      selectedLanguage.some((language) =>
        agent.languages.some((l) => l.toLowerCase() === language.toLowerCase())
      );

    const matchesSpecialist =
      selectedSpecialist.length === 0 ||
      selectedSpecialist.some((specialist) =>
        agent.areaOfSpecialist.some(
          (a) => a.toLowerCase().trim() === specialist.toLowerCase().trim()
        )
      );

    return (
      matchesName && matchesService && matchesLanguage && matchesSpecialist
    );
  });
  

  const displayedAgents = filteredAgents.slice(
    startIndex,
    startIndex + agentsPerPage
  );
  useEffect(() => {
    setTotalPages(Math.ceil(filteredAgents.length / 10));
  }, [filteredAgents]);
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
      </div>
  
      <MultiCheckboxSelect
        options={servicesType}
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
        groups={groupedOptions}
        placeholder="Area of Specialist"
        variant="primary"
        textAlign="left"
        styles="border-r border-gray-300 pr-1 rounded-none pr-4 text-[#414042]"
        isOpen={openIndex === 1}
        onToggle={() => handleToggleSelect(1)}
        ref={containerRef as RefObject<HTMLDivElement>}
      />

      <MultiCheckboxSelect
        options={languages}
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
        <Button className="w-full bg-[#2A2852] hover:bg-[#2A2852]/90">
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
                  {displayedAgents.map((agent) => (
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
            {filteredAgents && (
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                showFirstLast={true}
                maxVisiblePages={10}
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
