"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "lucide-react";
import { Clock } from "lucide-react";
import { ChatsTeardrop } from "@phosphor-icons/react";

export default function CommunitiesInquiryForm() {
  const [inquiryType, setInquiryType] = useState<"buy" | "rent">("buy");

  return (
    <div className="p-6 rounded-3xl bg-white shadow-sm border border-gray-100">
      <h2 className="text-2xl font-medium text-gray-700 mb-4">
        Submit Your Inquiry :
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Button
          variant={inquiryType === "buy" ? "default" : "outline"}
          className={
            inquiryType === "buy"
              ? "bg-[#2e3267] hover:bg-[#252a56] text-white"
              : "text-gray-700"
          }
          onClick={() => setInquiryType("buy")}
        >
          Buy
        </Button>
        <Button
          variant={inquiryType === "rent" ? "default" : "outline"}
          className={
            inquiryType === "rent"
              ? "bg-[#2e3267] hover:bg-[#252a56] text-white"
              : "text-gray-700"
          }
          onClick={() => setInquiryType("rent")}
        >
          Rent
        </Button>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col relative mt-6">
          <label className="text-[#414042] text-sm font-normal  absolute  bg-white p-1 left-3 -top-4">
            Name
          </label>
          <Input
            type="text"
            className="border border-[#ECECEC] rounded-[5px] p-[10px] placeholder:text-[#ACACAC] placeholder:text-sm placeholder:font-normal"
            placeholder="Name"
            id="firstName"
          />
        </div>

        <div className="flex flex-col mt-4 relative">
          <label className="text-[#414042] text-sm font-normal  absolute  bg-white p-1 left-3 -top-4">
            Email
          </label>
          <Input
            type="text"
            className="border border-[#ECECEC] rounded-[5px] p-[10px] placeholder:text-[#ACACAC] placeholder:text-sm placeholder:font-normal"
            placeholder="Email"
            id="email"
          />
        </div>

        <div className="flex flex-col mt-4 relative">
          <Label
            htmlFor="phone"
            className="text-[#414042] text-sm font-normal  absolute  bg-white p-1 left-3 -top-4"
          >
            Phone Number
          </Label>
          <Input
            id="phone"
            placeholder="Phone Number"
            className="border border-[#ECECEC] rounded-[5px] p-[10px] placeholder:text-[#ACACAC] placeholder:text-sm placeholder:font-normal"
          />
        </div>

        <div className="flex flex-col mt-4 relative">
          <Label
            htmlFor="unitType"
            className="text-[#414042] text-sm font-normal absolute bg-white p-1 left-3 -top-4"
          >
            Unit Type
          </Label>
          <Select defaultValue="apartment">
            <SelectTrigger
              className="border border-[#ECECEC] rounded-[5px] p-[10px] h-[44px] text-left placeholder:text-[#ACACAC] placeholder:text-sm placeholder:font-normal"
              id="unitType"
            >
              <SelectValue placeholder="Select unit type" />
            </SelectTrigger>
            <SelectContent className="border border-[#ECECEC] rounded-[5px]">
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="relative">
            <Input
              type="text"
              placeholder="10 nov, 2024"
              className="pl-3 pr-10 bg-[#F9F9F9] placeholder-[#b2b2b2] placeholder-opacity-100"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>

          <div className="flex items-center">
            <span className="mr-2 text-gray-500">at</span>
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="12:30 PM"
                className="pl-3 pr-10 bg-[#F9F9F9] placeholder-[#b2b2b2] placeholder-opacity-100"
              />
              <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="agreement1"
              className="mt-1 border-[#e86c3a] data-[state=checked]:bg-[#e86c3a] data-[state=checked]:text-white"
              defaultChecked
            />
            <Label
              htmlFor="agreement1"
              className="text-gray-600 text-sm font-normal"
            >
              Agree to receive calls and communications via various channels
              from PSI from 09:00 am to 09:00 pm.
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="agreement2"
              className="mt-1 border-[#e86c3a] data-[state=checked]:bg-[#e86c3a] data-[state=checked]:text-white"
              defaultChecked
            />
            <Label
              htmlFor="agreement2"
              className="text-gray-600 text-sm font-normal"
            >
              Agree to receive multiple calls and communications via various
              channels regarding my enquiry.
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="agreement3"
              className="mt-1 border-[#e86c3a] data-[state=checked]:bg-[#e86c3a] data-[state=checked]:text-white"
              defaultChecked
            />
            <Label
              htmlFor="agreement3"
              className="text-gray-600 text-sm font-normal"
            >
              Agree to receive calls and communications via various channels on
              various projects, products and services.
            </Label>
          </div>
        </div>

        <Button className="w-full bg-[#2C2D65] text-white rounded-[5px] p-[12px] mt-4">
          <ChatsTeardrop size={20} className="mr-2" />
          Submit
        </Button>
      </div>
    </div>
  );
}
