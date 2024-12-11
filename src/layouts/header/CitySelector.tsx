"use client"

import { Cities, settingsAtom } from "@/atoms/settingsAtoms"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cities } from "@/data"
import { langs } from "@/i18n.config"
import { cn } from "@/lib/utils"
import { CaretDown } from "@phosphor-icons/react"
import { useAtom, useAtomValue } from "jotai"
import { useState } from "react"

type Props = {}
export const CitySelector = (props: Props) => {
  const settings = useAtomValue(settingsAtom)
  const [open, setOpen] = useState(false)

  const city = Cities[settings?.city]

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="hover:bg-transparent">
            {city}
            <CaretDown size={12} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="max-w-[295px] py-5 px-2.5 space-y-3"
          align="start"
        >
          <SettingsPopoverContent onSave={() => setOpen(false)} />
        </PopoverContent>
      </Popover>
    </>
  )
}

const SettingsPopoverContent = ({ onSave }: { onSave: () => void }) => {
  const [settings, setSettings] = useAtom(settingsAtom)

  const selectedCity = settings.city

  return (
    <>
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-2.5">
          <Label className="font-medium">Select City</Label>
          <div className="flex flex-col gap-1 flex-wrap">
            {cities.map((city, index) => (
              <Button
                key={index}
                variant={
                  city.value == selectedCity ? "primary-blue" : "outline"
                }
                className="text-xs font-medium transition-all"
                onClick={() => {
                  setSettings((prev) => ({
                    ...prev,
                    city: city.value,
                  }))
                  onSave()
                }}
              >
                {city.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
