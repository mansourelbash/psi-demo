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
import { agents, locations } from "@/data/data";
import { Agent } from "@/types/agent";
import { UnitCard } from "@/components/app/UnitCard";
import { CustomPagination } from "@/components/app/CustomPagination";
import { useMediaQuery } from "react-responsive";
import ReviewCard from "@/components/app/ReviewCard";
import AreaCard from "@/components/app/AreaCard";
import { UnitModel } from "@/types/Unit";

const AgentDetailsPage = () => {
  const { id } = useParams() as { id: string };
  const [filter, setFilter] = useState("SALE");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [units, setUnits] = useState<UnitModel[]>([]); 
  const [agentDetails, setAgentDetails] = useState<Agent | null>(null);

  const itemsPerPage = 9;

  const getProfileData = (id: string) => {
    return agents.find((agent) => agent.id === id);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const agent = getProfileData(id);
      if (agent) {
        setAgentDetails(agent);
      }
    }
  }, [id]);

  const getData = useCallback(async () => {
    try {
      const url = `https://web.dev.psi-crm.com/api/units/FetchUnitsList/${filter}/26792`;

      if (filter === "ALL") {
        const [rentRes, saleRes] = await Promise.all([
          fetch(
            `https://web.dev.psi-crm.com/api/units/FetchUnitsList/RENT/26792`,
            { cache: "force-cache" }
          ),
          fetch(
            `https://web.dev.psi-crm.com/api/units/FetchUnitsList/SALE/26792`,
            { cache: "force-cache" }
          ),
        ]);
        const [rentData, saleData] = await Promise.all([
          rentRes.json(),
          saleRes.json(),
        ]);
        setUnits([...rentData, ...saleData]);
      } else {
        const res = await fetch(url);
        const data = await res.json();
        setUnits(data);
      }

      console.log("Fetched data for:", filter);
      setTotalPages(Math.ceil(units.length / itemsPerPage));
    } catch (error) {
      console.error('Error fetching units:', error);
    }
  }, [filter, units.length]);

  useEffect(() => {
    getData();
  }, [getData]);

  const getPaginatedUnits = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return units.slice(startIndex, endIndex);
  };

  return (
    <div>
      {agentDetails && (
        <>
          {' '}
          <ProfileCard
            id={id}
            setIsOpen={setIsModalOpen}
            isOpen={isModalOpen}
            imageSrc={
              agentDetails?.image
                ? `/images/agents/${agentDetails?.image}`
                : '/images/agents/agent (3).png'
            }
            cover="/images/hero-agent-section.png"
            className="xs:overflow-show rounded-none xl:rounded-[20px] lg:rounded-[20px] md:rounded-[20px] xs:bg-mob-custom"

          >
            <h2 className="text-white text-[42px] xs:text-black">
              {agentDetails?.name ? agentDetails?.name : "Hazim Al Suwadi"}
            </h2>
            <p className="text-white mt-2 xs:text-black">
              Experience in Real Estate : 12 Years
            </p>
            <p className="text-white mb-4 xs:text-black">The Branch : St. Regis</p>
            <div className="flex flex-wrap gap-2 xs:justify-center">
              <Button
                variant='primary-blue'
                className='font-normal gap-1 w-[80px] h-9 px-1'
              >
                <Phone size={14} /> Call
              </Button>
              <Button
                variant='default'
                className='font-normal gap-1 w-[80px] h-9 px-1'
              >
                <EnvelopeSimple size={14} /> Email
              </Button>
              <Button
                variant='primary-green'
                className='font-normal gap-1 h-9 px-2 text-white'
              >
                <WhatsAppIcon /> WhatsApp
              </Button>
            </div>
          </ProfileCard>
        </>
      )}

      <nav className="border-b mb-6 justify-center flex">
        <Tabs defaultValue="properties" className="w-full tabs-agent-profile">
          <TabsList className="w-fit mx-auto  flex justify-center h-auto p-0 bg-transparent border-b border-gray-300 my-[35px] shadow-none">
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

          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-8 h-auto container mt-[10px]">
            <div className="col-span-1 order-2 sm:col-span-2 lg:col-span-3">
              <div>
                <TabsContent value="properties" className=" xs:mx-5px">
                  <div className="flex items-center justify-between pb-1">
                    <h2 className="text-left text-[26px] text-[#414042] mb-3">
                      Properties
                    </h2>
                    <div className="flex space-x-4">
                      {["ALL", "RENT", "SALE"].map((type) => (
                        <button
                          key={type}
                          onClick={() => setFilter(type)}
                          className={`relative h-7 px-2 font-medium transition-all duration-200 ${
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

                  <div className="grid grid-cols-1 xl:grid-cols-3 sm:grid-cols-2  gap-4">
                    {getPaginatedUnits().map((unit, index) => (
                      <div key={index}>
                        <UnitCard
                          key={index}
                          unit={unit}
                          operation="SALE"
                          width="md:w-[350px] sm:w-full"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
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
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="xs:mx-5px">
                  <h2 className="text-left text-[26px] text-[#414042] mb-3">
                    Reviews
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                      <ReviewCard
                        key={index}
                        text='The agent has been great in helping us to buy an apartment in Saadiyat Island. He is so professional and respectful. His marketing is great. Keep it on Hazim. Thank you 👌'
                      />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="specialist" className="xs:mx-5px">
                  <h2 className="text-left text-[26px] text-[#414042] mb-3">
                    Area Of Specialist
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {locations.map((location, index) => (
                      <AreaCard key={index} location={location} index={index} />
                    ))}
                  </div>
                </TabsContent>
              </div>
            </div>
            <div className="col-span-1 order-1 xl:order-2 lg:order-2 md:order-2 xs:mx-5px">
              <CardComponent
                title='Hello I’m Hazim👋'
                className='min-h-[200px] md:min-h-[300px]'
                description='With 8 years in Abu Dhabi’s real estate market, Hazim Al Swaidi is known for his deep market knowledge and commitment to client satisfaction. Specializing in residential and commercial properties, he ensures smooth and successful transactions, making him a trusted name in the industry.'
              />
              <CardComponent
                title="Contact The Agent"
                className="min-h-[500px] hidden lg:block md:block xl:block w-full"
              >
                <div className='flex flex-col gap-4'>
                  <input
                    className='p-3 rounded-[7px] border border-gray-300 placeholder-black'
                    type='text'
                    placeholder='Your Name'
                  />
                  <input
                    className='p-3 rounded-[7px] border border-gray-300 placeholder-black'
                    type='number'
                    placeholder='Phone'
                  />
                  <input
                    className='p-3 rounded-[7px] border border-gray-300 placeholder-black'
                    type='text'
                    placeholder='E-Mail'
                  />
                  <textarea
                    className='p-3 rounded-[7px] border border-gray-300 min-h-[120px] placeholder-black'
                    placeholder='Message'
                  ></textarea>
                  <Button className='w-full bg-[#2A2852] hover:bg-[#2A2852]/90 text-white py-3 rounded-[7px]'>
                    Send Message
                  </Button>
                </div>
              </CardComponent>

              <div className="relative mt-[20px] rounded-[15px] overflow-hidden hidden lg:flex md:flex xl:flex">
                <Image
                  src='/images/book-now.jpg'
                  alt='Yas Riva Property'
                  width={800}
                  height={1000}
                  className='w-full'
                  priority
                />
              </div>
            </div>
          </div>
        </Tabs>
      </nav>
    </div>
  );
};

export default AgentDetailsPage;