"use client";

import { ForwardIcon } from "../icons/forward-icon";
import Image from "next/image";
import ShareModal from "./ShareModal";
import { ProfileCardProps } from "@/types/Shared";
import LoaderSpinner from "./Loader"; 

export default function ProfileCard({
  setIsOpen,
  isOpen,
  imageSrc,
  children,
  cover,
  className = "",
  loading,
}: ProfileCardProps & { className?: string }) {


  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`relative container mx-auto overflow-hidden p-6 mt-[50px] xs:mt-0 ${cover ?? 'bg-[#051831]'} ${className}`}
      style={{ backgroundImage: cover ? `url(${cover})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <button
        onClick={handleOpenModal}
        className="bg-white flex justify-center w-[35px] h-[35px] absolute right-4 rounded-full top-4 text-black/80 hover:text-black/100"
      >
        <ForwardIcon className="size-4 text-[#000] top-[8px] relative" />
      </button>
      <ShareModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        url="Https://Psinv.Net/En/Developer/Aldar-Properties-Pjsc"
      />

      {loading ? (
        <div className="flex justify-center items-center h-[180px]">
          <LoaderSpinner className="text-white-loader" /> 
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:flex-row items-center sm:mx-10 lg:mx-[60px]">
          <div className="relative h-[180px] w-[180px] sm:h-[200px] sm:w-[200px] lg:h-[180px] lg:w-[180px] xs:w-[140px] xs:h-[140px] shrink-0 overflow-hidden rounded-full bg-white">
            <Image
              src={imageSrc ? imageSrc : "/images/developers/aldar-logo.png"}
              alt=""
              fill
              className="object-cover"
            />
          </div>

          <div className="mt-4 sm:mt-0 sm:ms-[30px] text-center sm:text-left">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
