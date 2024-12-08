"use client"

import { AppSelect } from "@/components/app/AppSelect"
import { Button } from "@/components/ui/button"
import { langs } from "@/i18n.config"
import { GlobeHemisphereWest } from "@phosphor-icons/react"
import Image from "next/image"
import { useParams, usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Props = {}
export const LanguageSelector = (props: Props) => {
  const { locale } = useParams<{ locale: string }>()
  const pathName = usePathname()
  const router = useRouter()

  const [selectedLocale, setSelectedLocale] = useState(locale)

  const redirectedPathName = (locale: string) => {
    const segments = pathName.split("/")
    segments[1] = locale
    router.push(segments.join("/"))
  }

  return (
    <>
      <AppSelect
        data={langs}
        valueKey="locale"
        labelKey="name"
        value={selectedLocale}
        onChange={(value) => {
          redirectedPathName(value)
          setSelectedLocale(value)
        }}
        // searchable={false}
        // cleanable={false}
        triggerButton={{ className: "border-0 px-0" }}
        // popoverContent={{
        //   align: "end",
        //   className: "lang",
        // }}
        beforeIcon={<GlobeHemisphereWest size={20} />}
        // renderLabel={(item) => (
        //   <div className="flex gap-2 items-center">
        //     <Image
        //       src={`/images/flags/${item.locale}-flag.webp`}
        //       alt="En Flag"
        //       width="60"
        //       height="40"
        //       className="h-4 w-auto"
        //     />
        //     <span>{item.name}</span>
        //   </div>
        // )}
      />
      <AppSelect data={[]} />
    </>
  )
}
