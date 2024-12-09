"use client"

import { localeAtom } from "@/atoms/dictionaryAtoms"
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
  useHydrateAtoms([[localeAtom, locale]])

  return <>{children}</>
}
