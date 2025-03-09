"use client";

import React, { useState, Dispatch, SetStateAction } from "react";
import { X } from "lucide-react";

type ToggleSelectionParams = {
    item: string;
    setFunction: React.Dispatch<React.SetStateAction<string[]>>;
    state: string[];
  };
const AddtionalFilter = ({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
  const [petsAllowed, setPetsAllowed] = useState("yes");
  const [selectedCity, setSelectedCity] = useState("Abu Dhabi");
  const [squareFeet, setSquareFeet] = useState({ min: "", max: "" });
  const [selectedPopular, setSelectedPopular] = useState<string[]>([]);
  const [selectedUnitRate, setSelectedUnitRate] = useState(["Hot Deals"]);
  const [selectedCompletion, setSelectedCompletion] = useState(["Ready"]);
  const [selectedFurnishing, setSelectedFurnishing] = useState(["Furnished"]);
  const [selectedFloorHeight, setSelectedFloorHeight] = useState(["High"]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]); 
  const [selectedInProperty, setSelectedInProperty] = useState<string[]>([]);
  const [selectedBuildingCommunity, setSelectedBuildingCommunity] = useState<string[]>([]);
  const [selectedUnitFeatures, setSelectedUnitFeatures] = useState<string[]>([]);
  const [outdoorSelection, setOutdoorSelection] = useState<string[]>([]);
  const [otherSelection, setOtherSelection] = useState<string[]>([]);

  const toggleSelection = ({ item, setFunction, state }: ToggleSelectionParams): void => {
    setFunction(
      state.includes(item) ? state.filter((i) => i !== item) : [...state, item]
    );
  };
  


  const resetFilters = () => {
    setPetsAllowed("yes");
    setSelectedCity("Abu Dhabi");
    setSquareFeet({ min: "", max: "" });
    setSelectedUnitRate(["Hot Deals"]);
    setOtherSelection([]);
    setOutdoorSelection([]);
    setSelectedCompletion(["Ready"]);
    setSelectedFurnishing(["Furnished"]);
    setSelectedFloorHeight(["High"]);
    setSelectedAmenities([]);
    setSelectedPopular([]);
    setSelectedInProperty([]);
    setSelectedBuildingCommunity([])
  };

  const handleApplyFilters = () => {
  console.log("Selected Filters:");
  console.log("Pets Allowed:", petsAllowed);
  console.log("City:", selectedCity);
  console.log("Square Feet:", squareFeet);
  console.log("Unit Rate:", selectedUnitRate);
  console.log("Selected Popular:", selectedPopular);
  console.log("Selected Completion:", selectedCompletion);
  console.log("Selected Furnishing:", selectedFurnishing);
  console.log("Selected Floor Height:", selectedFloorHeight);
  console.log("Selected Amenities:", selectedAmenities);
  console.log("Selected In Property:", selectedInProperty);
  console.log("Selected Building Community:", selectedBuildingCommunity);
  console.log("Outdoor Selection:", outdoorSelection);
  console.log("Other Selection:", otherSelection);

  setIsOpen(false);
};

  return (
    <div className="min-h-screen">
      <div className="max-w-8xl mx-auto bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-medium text-gray-800">Filters</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" onClick={() => setIsOpen(false)} />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-h-[80vh] overflow-y-auto">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">City</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Abu Dhabi",
                "Dubai",
                "Sharjah",
                "Ras Al Khaimah",
                "Al Ain",
              ].map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-4 py-2 text-sm rounded-md ${
                    selectedCity === city
                      ? "text-white bg-[#1e2b5e]"
                      : "text-gray-700 bg-gray-100"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

         {/* Square Feet */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Square Feet</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Min"
            value={squareFeet.min}
            onChange={(e) =>
              setSquareFeet({ ...squareFeet, min: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <input
            type="text"
            placeholder="Max"
            value={squareFeet.max}
            onChange={(e) =>
              setSquareFeet({ ...squareFeet, max: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      </div>

      {/* Unit Rate */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Unit Rate</h3>
        <div className="flex flex-wrap gap-2">
          {["Hot Deals", "Higher ROI", "Luxury", "Most liked", "Featured"].map(item => (
            <button
              key={item}
              onClick={() => toggleSelection({ item, setFunction: setSelectedUnitRate, state: selectedUnitRate })}

              
              className={`px-4 py-2 text-sm rounded-md ${selectedUnitRate.includes(item) ? 'text-white bg-[#1e2b5e]' : 'text-gray-700 bg-gray-100'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Unit Features */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Unit Features</h3>
        <div className="flex flex-wrap gap-2">
          {["Maid Room", "Driver Room", "Balcony", "Terrace", "Store Room", "Private pool"].map(item => (
            <button
              key={item}
              onClick={() => toggleSelection({item, setFunction: setSelectedUnitFeatures, state: selectedUnitFeatures})}
              className={`px-4 py-2 text-sm rounded-md ${selectedUnitFeatures.includes(item) ? 'text-white bg-[#1e2b5e]' : 'text-gray-700 bg-gray-100'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Completion */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Completion</h3>
        <div className="flex flex-wrap gap-2">
          {["Ready", "Off Plan"].map(item => (
            <button
              key={item}
              onClick={() => toggleSelection({item, setFunction: setSelectedCompletion, state: selectedCompletion})}
              className={`px-4 py-2 text-sm rounded-md ${selectedCompletion.includes(item) ? 'text-white bg-[#1e2b5e]' : 'text-gray-700 bg-gray-100'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Furnishing */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Furnishing</h3>
        <div className="flex flex-wrap gap-2">
          {["Furnished", "Unfurnished", "Partly furnished"].map(item => (
            <button
              key={item}
              onClick={() => toggleSelection({item, setFunction: setSelectedFurnishing, state: selectedFurnishing })}
              className={`px-4 py-2 text-sm rounded-md ${selectedFurnishing.includes(item) ? 'text-white bg-[#1e2b5e]' : 'text-gray-700 bg-gray-100'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

           {/* Floor Height */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Floor Height</h3>
        <div className="flex flex-wrap gap-2">
          {["High", "Mid", "Low"].map(item => (
            <button
              key={item}
              onClick={() => setSelectedFloorHeight([item])}
              className={`px-4 py-2 text-sm rounded-md ${selectedFloorHeight[0] === item ? 'text-white bg-[#1e2b5e]' : 'text-gray-700 bg-gray-100'}`}

            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Pets Allowed */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Pets Allowed?</h3>
        <div className="flex items-center gap-6">
          {["yes", "no"].map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="pets"
                className="hidden"
                checked={petsAllowed === option}
                onChange={() => setPetsAllowed(option)}
              />
              <span
                className={`w-4 h-4 border rounded-full flex items-center justify-center ${
                  petsAllowed === option ? "border-[#f15a29]" : "border-gray-300"
                }`}
              >
                {petsAllowed === option && (
                  <span className="w-2 h-2 rounded-full bg-[#f15a29]"></span>
                )}
              </span>
              <span className="text-sm text-gray-700">
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

          {/* Amenities */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Amenities
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Central A/C",
                "Maids Room",
                "Balcony",
                "Shared Pool",
                "Shared Spa",
                "Shared Gym",
                "Covered Parking",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    toggleSelection({
                      item,
                      setFunction: setSelectedAmenities,
                      state: selectedAmenities
                  })
                  }
                  className={`px-4 py-2 text-sm rounded-md ${
                    selectedAmenities.includes(item)
                      ? "text-white bg-[#1e2b5e]"
                      : "text-gray-700 bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Popular */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Popular</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Balcony",
                "Maids Room",
                "Storage Room",
                "Private Pool",
                "Parking",
                "Pets Allowed",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    toggleSelection({
                        item,
                      setFunction: setSelectedPopular,
                      state: selectedPopular
                  })
                  }
                  className={`px-4 py-2 text-sm rounded-md ${
                    selectedPopular.includes(item)
                      ? "text-white bg-[#1e2b5e]"
                      : "text-gray-700 bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* In the Property */}
          <div className="md:col-span-2">
        <h3 className="text-sm font-medium text-gray-700 mb-3">In the Property</h3>
        <div className="flex flex-wrap gap-2">
          {["Built in Wardrobes", "Kitchen Appliances", "Networked", "Private Gym", "Study Room", "Private Jacuzzi", "View of Landmark", "Walk-in Closet"].map(item => (
            <button
              key={item}
              onClick={() => toggleSelection({item, setFunction: setSelectedInProperty, state: selectedInProperty})}
              className={`px-4 py-2 text-sm rounded-md ${selectedInProperty.includes(item) ? 'text-white bg-[#1e2b5e]' : 'text-gray-700 bg-gray-100'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

          {/* Building/Community */}
          <div className="md:col-span-2">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Building/Community</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Children's Play Area", "Concierge", "Children's Pool, Beach Access", "Pantry", 
            "Study Room", "Conference Room", "Covered Parking", "Dining in Building", 
            "Lobby in Building", "Maid Service", "Security", "Shared Gym", 
            "Shared Pool", "Beach Access"
          ].map(item => (
            <button
              key={item}
              onClick={() => toggleSelection({item, setFunction: setSelectedBuildingCommunity, state: selectedBuildingCommunity})}
              className={`px-4 py-2 text-sm rounded-md ${selectedBuildingCommunity.includes(item) ? 'text-white bg-[#1e2b5e]' : 'text-gray-700 bg-gray-100'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

               {/* Outdoor/Garden */}
      <div className="md:col-span-2">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Outdoor/Garden</h3>
        <div className="flex flex-wrap gap-2">
          {["Private Garden", "Barbecue Area"].map(item => (
            <button
              key={item}
              onClick={() => toggleSelection({item, setFunction: setOutdoorSelection, state: outdoorSelection})}
              className={`px-4 py-2 text-sm rounded-md ${outdoorSelection.includes(item) ? 'text-white bg-[#1e2b5e]' : 'text-gray-700 bg-gray-100'}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Others */}
      <div className="md:col-span-2">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Others</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "24 hour maintenance", "24 hour security", "Basketball court", "BBQ & Fire Pits", "Beach & Private Beach",
            "Central Location", "Children's play area", "Childrens Swimming Pool", "Coffee Shop", "Fitness club", "Gym",
            "Health Club", "Infinity pool", "Kids Pool", "Lady's Gym", "Soccer", "Laundry Service", "Leisure and Lap pool",
            "Retails", "Marina", "Prayer Area", "Sky Pod", "Private Cinema", "Retail and F&B outlets", "Sauna & steam rooms",
            "Valet services", "Private Pier", "Visitor parking", "Swimming pool", "Valet Parking"
          ].map(item => (
            <button
              key={item}
              onClick={() => toggleSelection({item, setFunction: setOtherSelection, state: otherSelection})}
              className={`px-4 py-2 text-sm rounded-md ${otherSelection.includes(item) ? 'text-white bg-[#1e2b5e]' : 'text-gray-700 bg-gray-100'}`}
            >
              {item}
            </button>
          ))}
        </div>
        <button className="mt-3 text-[#f15a29] text-sm font-medium flex items-center">
          See More <span className="ml-1">↓</span>
        </button>
      </div>

        </div>
      </div>

      <div className="p-4 border-t flex justify-between items-center">
        <button
          className="text-[#f15a29] text-sm font-medium"
          onClick={resetFilters}
        >
          Clear all
        </button>

        <div className="flex gap-3">
          <button
            className="px-6 py-2 bg-[#f15a29] text-white rounded-md font-medium"
            onClick={handleApplyFilters}
          >
            Apply all
          </button>
          <button className="px-6 py-2 bg-[#f15a29] text-white rounded-md font-medium">
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddtionalFilter;
