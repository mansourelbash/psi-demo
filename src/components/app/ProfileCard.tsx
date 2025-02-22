"use client"

import { ForwardIcon } from "../icons/forward-icon"
import Image from "next/image"
import ShareModal from "./ShareModal"
import { ProfileCardProps } from "@/types/Shared"

export default function ProfileCard({ setIsOpen, isOpen, imageSrc, children, cover }: ProfileCardProps) {

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <div 
      className={`relative container mx-auto overflow-hidden rounded-[20px] p-6 mt-[50px] ${cover ?? 'bg-[#051831]'}`} 
      style={{ backgroundImage: cover ? `url(${cover})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <button 
        onClick={handleOpenModal} 
        className="bg-white flex justify-center w-[35px] h-[35px] absolute right-4 rounded-full top-4 text-black/80 hover:text-black/100">
        <ForwardIcon className='size-4 text-[#000] top-[8px] relative' />
      </button>
      <ShareModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        url="Https://Psinv.Net/En/Developer/Aldar-Properties-Pjsc"
      />

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center mx-[60px]">
        <div className="relative h-[180px] w-[180px] shrink-0 overflow-hidden rounded-full bg-white">
          <Image
            src={imageSrc ? imageSrc : "/images/developers/aldar-logo.png"}
            alt="Aldar Properties Logo"
            fill
            className="object-cover p-2"
          />
        </div>

        <div className="ms-[30px]">
          {children}
        </div>
      </div>
    </div>
  )
}
