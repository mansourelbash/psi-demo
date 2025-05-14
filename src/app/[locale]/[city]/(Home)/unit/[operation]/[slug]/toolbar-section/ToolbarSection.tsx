'use client'

import { AppBreadcrumb } from "@/components/app/AppBreadcrumb"
import ShareModal from "@/components/app/ShareModal"
import { CompareIcon } from "@/components/icons/compare-icon"
import { Container } from "@/components/ui/container"
import { HeartStraight, ShareNetwork } from "@phosphor-icons/react/dist/ssr"
import { useState } from "react"

type Props = {
  breadcrumbData: {
    name: string
    href: string
  }[]
}
export const ToolbarSection = ({ breadcrumbData }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Container className="flex justify-between items-center gap-2 flex-wrap">
      <AppBreadcrumb data={breadcrumbData} />
      <div className="flex gap-3.5">
        <button className="flex gap-2 items-center text-sm font-medium">
          <div className="size-[40px] border rounded-full flex items-center justify-center">
            <HeartStraight size={20} />
          </div>
          Save
        </button>
        <button className="flex gap-2 items-center text-sm font-medium">
          <div className="size-[40px] border rounded-full flex items-center justify-center">
            <CompareIcon className="size-4" />
          </div>
          Compare
        </button>
        <button className="flex gap-2 items-center text-sm font-medium"  onClick={handleOpenModal}>
          <div className="size-[40px] border rounded-full flex items-center justify-center">
            <ShareNetwork size={20} />
          </div>
          Share
        </button>
          <ShareModal
            isOpen={isOpen}
            onClose={handleCloseModal}
            url="Https://Psinv.Net/En/Developer/Aldar-Properties-Pjsc"
          />
      </div>
    </Container>
  )
}
