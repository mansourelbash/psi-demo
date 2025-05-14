"use client";
import CardComponent from "@/components/app/CardComponent";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileCard from "@/components/app/ProfileCard";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { EnvelopeSimple } from "@phosphor-icons/react";
import { Phone } from "lucide-react";
import { Agent } from "@/types/agent";
import { UnitCard } from "@/components/app/UnitCard";
import { CustomPagination } from "@/components/app/CustomPagination";
import { useMediaQuery } from "react-responsive";
import ReviewCard from "@/components/app/ReviewCard";
import { UnitModel } from "@/types/Unit";
import { ProjectCard } from "@/components/app/ProjectCard";
import {
  API_URL,
  getAreaOfSpecialistCommunitiesData,
  getAreaOfSpecialistDevelopersData,
  getAreaOfSpecialistProjectsData,
  getProfileData,
} from "@/services/agents";
import AreaCard from "@/components/app/AreaCard";
import { Developer, PropertyListModel } from "@/types/Property";
import { DeveloperCard } from "@/components/app/developer/DeveloperCard";
import Link from "next/link";

const AgentDetailsPage = () => {
  const { id, locale, city } = useParams() as {
    id: string;
    locale: string;
    city: string;
  };
  const [filter, setFilter] = useState("SALE");
  const [areaOfSpecialistFilter, setAreaOfSpecialistFilter] =
    useState("Projects");
  const [areaOfSpecialistItems, setAreaOfSpecialistItems] = useState([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [units, setUnits] = useState<UnitModel[]>([]);
  const [agentDetails, setAgentDetails] = useState<Agent | null>(null);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchAgent = async () => {
      if (typeof window !== "undefined") {
        try {
          const agent = await getProfileData(id);
          if (agent) {
            setAgentDetails(agent);
          }
        } catch (error) {
          console.error("Error fetching agent profile:", error);
        }
      }
    };

    fetchAgent();
  }, [id]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getData = useCallback(async () => {
    try {
      let fetchedUnits = [];

      if (filter === "ALL") {
        const [rentRes, saleRes] = await Promise.all([
          fetch(
            `${API_URL}/units/search?map_view=false&page=1&per_page=25&operation_type=RENT&agent_id=${id}`,
            { cache: "force-cache" }
          ),
          fetch(
            `${API_URL}/units/search?map_view=false&page=1&per_page=25&operation_type=SALE&agent_id=${id}`,
            { cache: "force-cache" }
          ),
        ]);

        const [rentData, saleData] = await Promise.all([
          rentRes.json(),
          saleRes.json(),
        ]);

        fetchedUnits = [...rentData.items, ...saleData.items];
      } else {
        const url = `${API_URL}/units/search?map_view=false&page=1&per_page=25&operation_type=${filter}&agent_id=${id}`;
        const res = await fetch(url);
        const data = await res.json();
        fetchedUnits = data.items;
      }

      setUnits(fetchedUnits);
      setTotalPages(Math.ceil(fetchedUnits.length / itemsPerPage));
    } catch (error) {
      console.error("Error fetching units:", error);
    }
  }, [filter, id, itemsPerPage]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      let data = { items: [] };

      if (areaOfSpecialistFilter === "Projects") {
        data = await getAreaOfSpecialistProjectsData(id);
        setAreaOfSpecialistItems(data.items);
      } else if (areaOfSpecialistFilter === "Communities") {
        data = await getAreaOfSpecialistCommunitiesData(id);
        setAreaOfSpecialistItems(data.items);
      } else if (areaOfSpecialistFilter === "Developers") {
        data = await getAreaOfSpecialistDevelopersData(id);
        setDevelopers(data.items);
      }
    };

    fetchData();
  }, [areaOfSpecialistFilter, id]);

  const getPaginatedUnits = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return units.slice(startIndex, endIndex);
  };

  return (
    <div>
      {agentDetails && (
        <>
          <ProfileCard
            id={id}
            setIsOpen={setIsModalOpen}
            isOpen={isModalOpen}
            imageSrc={
              agentDetails?.profile_image
                ? `${agentDetails?.profile_image.preview}`
                : "/images/agents/agent (3).png"
            }
            cover="/images/hero-agent-section.png"
            className="xs:overflow-show rounded-none xl:rounded-[20px] lg:rounded-[20px] md:rounded-[20px] xs:bg-mob-custom"
          >
            <h2 className="text-white text-[42px] xs:text-black">
              {agentDetails?.name ? agentDetails?.name : "Hazim Al Suwadi"}
            </h2>
            {agentDetails?.years_of_experience && (
              <p className="text-white xs:text-black">
                Experience in Real Estate:{" "}
                {agentDetails?.years_of_experience
                  ? `${agentDetails.years_of_experience} Years`
                  : "N/A"}
              </p>
            )}
            <p className="text-white mb-4 xs:text-black">
              The Branch : {agentDetails?.branch?.name}
            </p>
            <div className="flex flex-wrap gap-2 xs:justify-center">
              <Link href={`tel:${agentDetails.phone_number}`} passHref>
                <Button
                  variant="primary-blue"
                  className="font-normal gap-1 w-[80px] h-9 px-1"
                >
                  <Phone size={14} /> Call
                </Button>
              </Link>

              <Link href={`mailto:${agentDetails?.email}`} passHref>
                <Button
                  variant="default"
                  className="font-normal gap-1 w-[80px] h-9 px-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <EnvelopeSimple size={14} /> Email
                </Button>
              </Link>
              <Button
                variant="primary-green"
                className="font-normal gap-1 h-9 px-2 text-white"
                onClick={() =>
                  window.open(
                    `https://wa.me/${agentDetails?.whatsapp_number}`,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                <WhatsAppIcon /> WhatsApp
              </Button>
            </div>
          </ProfileCard>

          {/* Mobile-only CardComponent - appears before nav on small screens */}
          <div className="block lg:hidden md:hidden xl:hidden xs:mx-5 xs:mt-4">
            <CardComponent
              title={
                agentDetails?.name
                  ? `Hello I'm ${agentDetails?.name?.split(" ")[0]}`
                  : "Hello I'm Hazim👋"
              }
              className="min-h-[200px] md:my-[5px]"
              description={
                agentDetails?.overview
                  ? agentDetails?.overview
                  : "With 8 years in Abu Dhabi's real estate market, Hazim Al Swaidi is known for his deep market knowledge and commitment to client satisfaction. Specializing in residential and commercial properties, he ensures smooth and successful transactions, making him a trusted name in the industry."
              }
            />
          </div>
        </>
      )}

      <nav className="border-b mb-6 justify-center flex">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-8 h-auto px-5 w-full lg:w-[95%] mt-[10px]">
          <div className="col-span-1 order-1 sm:col-span-2 lg:col-span-3">
            <Tabs defaultValue="properties" className="w-full tabs-agent-profile">
              <TabsList className="w-fit mx-auto flex justify-center h-auto p-0 bg-transparent border-b border-[#ECECEC] my-[35px] shadow-none">
                <TabsTrigger
                  value="properties"
                  className="px-3 py-2 relative after:content-[''] after:absolute after:left-0 after:bottom-[-1px] after:w-full after:h-[2px] after:bg-orange-500 after:scale-x-0 data-[state=active]:after:scale-x-100 transition-transform"
                >
                  My Properties
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="px-3 py-2 relative after:content-[''] after:absolute after:left-0 after:bottom-[-1px] after:w-full after:h-[2px] after:bg-orange-500 after:scale-x-0 data-[state=active]:after:scale-x-100 transition-transform shadow-none"
                >
                  Reviews
                </TabsTrigger>
                <TabsTrigger
                  value="specialist"
                  className="px-3 py-2 relative after:content-[''] after:absolute after:left-0 after:bottom-[-1px] after:w-full after:h-[2px] after:bg-orange-500 after:scale-x-0 data-[state=active]:after:scale-x-100 transition-transform shadow-none"
                >
                  Area Of Specialist
                </TabsTrigger>
              </TabsList>

              <div className="">
                <TabsContent value="properties" className="xs:mx-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-1 space-y-3 sm:space-y-0">
                    <h2 className="text-[26px] text-[#414042]">
                      My Properties
                    </h2>
                    <div className="flex flex-wrap gap-2 sm:gap-4">
                      {["ALL", "RENT", "SALE"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setFilter(type)}
                          className={`relative h-7 px-3 font-medium transition-all duration-200 ${
                            filter === type
                              ? "text-[#ff6b4e] bg-[#FFFFFF] border border-[#ECECEC] rounded-md shadow-lg"
                              : "text-gray-600 bg-[#F9F9F9] rounded-md shadow-none"
                          }`}
                        >
                          {type === "ALL"
                            ? "All"
                            : type === "RENT"
                            ? "For Rent"
                            : "For Sale"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 sm:grid-cols-2 gap-4">
                    {getPaginatedUnits().length === 0 ? (
                      <div className="col-span-full text-center text-gray-500 py-8">
                        No data exists.
                      </div>
                    ) : (
                      getPaginatedUnits().map((unit, index) => (
                        <div key={index}>
                          <UnitCard
                            key={index}
                            unit={unit}
                            operation="SALE"
                            width="sm:w-full"
                            route_to={`/${locale}/${city}/unit/${
                              filter ?? "SALE"
                            }/${unit.id}`}
                          />
                        </div>
                      ))
                    )}
                  </div>

                  <div>
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
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="xs:mx-5">
                  <h2 className="text-left text-[26px] text-[#414042] mb-3">
                    Reviews
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                      <ReviewCard
                        key={index}
                        text="The agent has been great in helping us to buy an apartment in Saadiyat Island. He is so professional and respectful. His marketing is great. Keep it on Hazim. Thank you 👌"
                      />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="specialist" className="xs:mx-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-1 space-y-3 sm:space-y-0">
                    <h2 className="text-[26px] text-[#414042]">
                      Area Of Specialist
                    </h2>
                    <div className="flex flex-wrap gap-2 sm:gap-4">
                      {["Communities", "Projects", "Developers"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setAreaOfSpecialistFilter(type)}
                          className={`relative h-7 px-3 font-medium transition-all duration-200 ${
                            areaOfSpecialistFilter === type
                              ? "text-[#ff6b4e] bg-white border border-[#ECECEC] rounded-md shadow-lg"
                              : "text-gray-600 bg-[#F9F9F9] rounded-md shadow-none"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
                    {areaOfSpecialistFilter === "Projects" &&
                    areaOfSpecialistItems.length === 0 ? (
                      <div className="col-span-full text-center text-gray-500 py-8">
                        No projects available.
                      </div>
                    ) : (
                      areaOfSpecialistFilter === "Projects" &&
                      areaOfSpecialistItems.map((project, index) => (
                        <ProjectCard
                          key={index}
                          project={project as unknown as PropertyListModel}
                          index={index}
                          useResponsive={true}
                        />
                      ))
                    )}

                    {areaOfSpecialistFilter === "Communities" &&
                    areaOfSpecialistItems.length === 0 ? (
                      <div className="col-span-full text-center text-gray-500 py-8">
                        No communities available.
                      </div>
                    ) : (
                      areaOfSpecialistFilter === "Communities" &&
                      areaOfSpecialistItems.map((location, index) => (
                        <AreaCard
                          key={index}
                          location={location}
                          index={index}
                        />
                      ))
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    {areaOfSpecialistFilter === "Developers" &&
                    developers.length === 0 ? (
                      <div className="col-span-full text-center text-gray-500 py-8">
                        No developers available.
                      </div>
                    ) : (
                      areaOfSpecialistFilter === "Developers" &&
                      developers.map((developer, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-center hover:cursor-pointer border border-[#ECECEC] rounded-md"
                        >
                          <DeveloperCard developer={developer} />
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
          
          {/* Desktop CardComponent - hidden on mobile since we show it above */}
          <div className="col-span-1 order-2 xl:order-2 lg:order-2 md:order-2 xs:mx-5 hidden xs:block lg:block">
            <CardComponent
              title={
                agentDetails?.name
                  ? `Hello I'm ${agentDetails?.name?.split(" ")[0]}`
                  : "Hello I'm Hazim👋"
              }
              className="min-h-[200px] md:min-h-[300px]"
              description={
                agentDetails?.overview
                  ? agentDetails?.overview
                  : "With 8 years in Abu Dhabi's real estate market, Hazim Al Swaidi is known for his deep market knowledge and commitment to client satisfaction. Specializing in residential and commercial properties, he ensures smooth and successful transactions, making him a trusted name in the industry."
              }
            />
            <CardComponent
              title="Contact The Agent"
              className="min-h-[500px] hidden lg:block md:block xl:block w-full"
            >
              <div className="flex flex-col gap-4">
                <input
                  className="p-3 rounded-[7px] border border-[#ECECEC] placeholder-black"
                  type="text"
                  placeholder="Your Name"
                />
                <input
                  className="p-3 rounded-[7px] border border-[#ECECEC] placeholder-black"
                  type="number"
                  placeholder="Phone"
                />
                <input
                  className="p-3 rounded-[7px] border border-[#ECECEC] placeholder-black"
                  type="text"
                  placeholder="E-Mail"
                />
                <textarea
                  className="p-3 rounded-[7px] border border-[#ECECEC] min-h-[120px] placeholder-black"
                  placeholder="Message"
                ></textarea>
                <Button className="w-full bg-[#2A2852] hover:bg-[#2A2852]/90 text-white py-3 rounded-[7px]">
                  Send Message
                </Button>
              </div>
            </CardComponent>

            <div className="relative mt-[20px] rounded-[15px] overflow-hidden hidden lg:flex md:flex xl:flex mb-5">
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
      </nav>
    </div>
  );
};

export default AgentDetailsPage;