"use client"

import { Button } from "@/components/ui/button"
import {ForwardIcon} from "../icons/forward-icon"
import Image from "next/image"
import { useState } from "react"
import ShareModal from "./ShareModal"

export default function HeroCompanyCard() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="relative w-full max-w-[108rem] mx-auto overflow-hidden rounded-xl bg-[#051831] p-6">
      <button onClick={() => setIsOpen(true)} className="bg-white flex justify-center w-[40px] h-[40px] absolute right-4 rounded-full top-4 text-black/80 hover:black/100">
        <ForwardIcon className='size-6 text-[#000] top-[5px] relative'   />
      </button>
      <ShareModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        url="Https://Psinv.Net/En/Developer/Aldar-Properties-Pjsc"
      />

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center mx-[60px]">
        <div className="relative h-[180px] w-[180px] shrink-0 overflow-hidden rounded-full bg-white">
          <Image
            src={"/images/developers/aldar-logo.png"}
            alt="Aldar Properties Logo"
            fill
            className="object-contain p-2"
          />
        </div>

        <div className="space-y-3 ms-[40px]">
          <h2 className="text-2xl font-medium text-white">Aldar Properties PJSC</h2>

          <div className="space-y-1 text-sm text-white/80">
            <p>Properties: 105</p>
            <p>Founded in: 2000 y.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="h-8 border-white/20 bg-transparent text-black bg-[#FFFFFF] hover:bg-slate-100">
              Find Property
            </Button>
            <Button className="h-8 bg-[#FF5A3D] text-white hover:bg-[#FF5A3D]/90">View details</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

