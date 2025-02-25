"use client";

import { capitalizeWords } from "@/lib/capitlizeWords";
import { getDevelopersProfile } from "@/services/developers";
import React, { useEffect } from "react";

interface Props {
  propertyId: number
}
interface Company {
  name: string;
}
  
const AboutDeveloper = ({propertyId}:Props) => {
    const [overview, setOverview] = React.useState("");
    const [company, setCompany] = React.useState<Company | null>(null);
    

    useEffect(() => {
      const fetchData = async () => {
        try {
          const developerProjectsData = await getDevelopersProfile(propertyId);
           console.log("Developer Data:", developerProjectsData);
          if (!developerProjectsData) {
            throw new Error("Developer data not found");
          }
    
          setOverview(developerProjectsData.overview || '');
          setCompany(developerProjectsData)
    
        } catch (error) {
          console.error("Error fetching developer projects:", error);
        } finally {
        }
      };
    
      fetchData();
    }, [propertyId]);

  return (
    <div className="border-gray-300 min-h-[200px] md:min-h-[300px] rounded-[15px] border p-[20px] md:p-[30px] xs:mx-5px">
      <h4 className="text-center font-semibold text-[16px] md:text-[20px]">
      About {company?.name ? capitalizeWords(company.name) : ""} 🏢
      </h4>

      <p className="mt-4 text-[#414042] text-[16px] md:text-[14px]">
        {overview || "Loading overview..."}
      </p>
    </div>
  );
};

export default AboutDeveloper;
