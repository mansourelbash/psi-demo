"use client";

import React, { useEffect, useState } from "react";
import MultiCheckboxSelect from "../MultiCheckboxSelect";
import LoaderSpinner from "../Loader";
import { TypographyH2 } from "@/components/ui/typography";

type CommunitPriceInsightProps = {
  communityName: string;
};

type PriceInsightItem = {
  bedrooms: number;
  medianPrice: number;
  medianSize: number;
};


const CommunityPriceInsight = ({
  communityName,
}: CommunitPriceInsightProps) => {
  const [selectedStatues, setSelectedStatues] = useState<string>("430");
  const [unitTypesData, setUnitTypesData] = useState<string[]>([]);
  const [selectedUnitType, setSelectedUnitType] = useState<string>("apartment");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [dataTable, setDataTable] = useState<PriceInsightItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getUnitTypesFromMBI = async (): Promise<string[]> => {
    const res = await fetch(
      `https://web.dev.psi-crm.com/api/mpi/GetMPIUnitTypes?operationType=${selectedStatues}&period=100&community=${communityName}`
    );
    const data = await res.json();
    setUnitTypesData(data);
    return data;
  };

  const getDataTableFromMBI = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://web.dev.psi-crm.com/api/mpi/GetMPIPricesForProperty",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            period: 100,
            operationType: selectedStatues === "buy" ? 430 : 431,
            unitType: selectedUnitType,
            community: communityName,
            mpiFilterType: 2,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setLoading(false);
      setDataTable(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUnitTypesFromMBI();
  }, [selectedStatues]);

  useEffect(() => {
    getDataTableFromMBI();
  }, [selectedStatues, selectedUnitType]);

  const operation = [
    { id: "430", name: "Buy" },
    { id: "431", name: "Rent" },
  ];

  const unitTypeOptions = unitTypesData?.map((item) => ({
    id: item,
    name: item.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  const handleToggleStatues = (statusId: string) => {
    setSelectedStatues(statusId);
  };

  const handleToggleUnitType = (unitId: string) => {
    setSelectedUnitType(unitId);
  };

  const handleToggleSelect = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="flex justify-between">
        <TypographyH2 className="font-medium">Price Insights</TypographyH2>
        <div className="flex mb-4">
          <div className="mr-2 flex gap-2">
            <MultiCheckboxSelect
              options={operation}
              selectedOptions={selectedStatues}
              onToggleOption={handleToggleStatues}
              title="Status"
              isMulti={false}
              variant="outlined"
              isOpen={openIndex === 1}
              onToggle={() => handleToggleSelect(1)}
            />

            <MultiCheckboxSelect
              options={unitTypeOptions}
              selectedOptions={selectedUnitType}
              onToggleOption={handleToggleUnitType}
              title="Unit Type"
              isMulti={false}
              variant="default"
              isOpen={openIndex === 2}
              onToggle={() => handleToggleSelect(2)}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="relative inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <LoaderSpinner />
          </div>
        ) : (
          <table className="border border-[#ECECEC] min-w-full divide-y divide-gray-200">
            <thead className="bg-[#F9F9F9]">
              <tr>
                <th className="px-6 py-3 text-left text-xs border border-[#ECECEC] font-bold text-[#414042] tracking-wider">
                  Beds
                </th>
                <th className="px-6 py-3 text-left text-xs border border-[#ECECEC] font-bold text-[#414042] tracking-wider">
                  Median Price
                </th>
                <th className="px-6 py-3 text-left text-xs border border-[#ECECEC] font-bold text-[#414042] tracking-wider">
                  Median Size
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dataTable?.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 border border-[#ECECEC] whitespace-nowrap text-sm text-gray-700">
                    {item.bedrooms ? item.bedrooms + ' Beds' : ''}
                  </td>
                  <td className="px-6 py-4 border border-[#ECECEC] whitespace-nowrap text-sm text-gray-700">
                    {item.medianPrice.toLocaleString() ? 'AED ' + item.medianPrice.toLocaleString() : ''}
                  </td>
                  <td className="px-6 py-4 border border-[#ECECEC] whitespace-nowrap text-sm text-gray-700">
                    {item.medianSize.toLocaleString() ? item.medianSize.toLocaleString() + ' Sqft' : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default CommunityPriceInsight;
