"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  At,
  ChatCircle,
  Copy,
  TelegramLogo,
  TwitterLogo,
} from "@phosphor-icons/react"
import { WhatsAppIcon } from "../icons/whatsapp-icon"

type DataType = {
  link: string
}

export const useShareDialog = () => {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<DataType>()

  const handleDialogOpen = (data: DataType) => {
    setOpen(true)
    setData(data)
  }

  const dialog = (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-8 max-w-[576px]">
        {data && <ShareDialogContent data={data} />}
      </DialogContent>
    </Dialog>
  )
  return { dialog, handleDialogOpen }
}

type ShareDialogContentProps = {
  data: DataType
}
const ShareDialogContent = ({ data }: ShareDialogContentProps) => {
  return (
    <div className="space-y-11">
      <DialogHeader>
        <DialogTitle className="font-medium">Share with</DialogTitle>
      </DialogHeader>
      <div className="flex flex-wrap gap-4 text-primary-dark-blue">
        {shareOptions.map((shareItem, index) => (
          <button
            className="group flex flex-col gap-2 items-center hover:text-primary"
            key={index}
          >
            <div className="size-[72px] flex justify-center items-center bg-secondary-white rounded-full group-hover:bg-primary/10">
              <shareItem.icon size={24} className="size-[24px]" weight="bold" />
            </div>
            <span className="text-xs font-medium">{shareItem.name}</span>
          </button>
        ))}
      </div>
      <div className="space-y-3.5">
        <div className="text-center text-sm font-medium">
          Or Share with link
        </div>
        <div className="flex gap-2 h-[53px] w-full text-foreground/40 bg-secondary-white items-center ps-4 pe-6 rounded-lg">
          <span className="grow truncate">{data.link}</span>
          <Copy size={24} className="text-primary cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

const shareOptions = [
  {
    icon: ChatCircle,
    name: "Chat",
  },
  {
    icon: TelegramLogo,
    name: "Telegram",
  },
  {
    icon: TwitterLogo,
    name: "Twitter",
  },
  {
    icon: WhatsAppIcon,
    name: "Whatsapp",
  },
  {
    icon: At,
    name: "E-mail",
  },
]
