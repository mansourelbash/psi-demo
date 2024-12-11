"use client"

import { settingsAtom, settingsDefault } from "@/atoms/settingsAtoms"
import { useHydrateAtoms } from "jotai/utils"

// HydrationProvider to hydrate both locale and dictionary
export const HydrationProvider = ({
  locale,
  dictionary,
  children,
}: {
  locale: string
  dictionary: Record<string, string>
  children: React.ReactNode
}) => {
  const settings =
    typeof window !== "undefined"
      ? localStorage.getItem("settings")
        ? JSON.parse(localStorage.getItem("settings")!)
        : settingsDefault
      : null
  useHydrateAtoms([[settingsAtom, { ...settings, locale }]])

  return <>{children}</>
}
