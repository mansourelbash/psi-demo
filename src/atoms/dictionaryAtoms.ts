// atoms/dictionaryAtoms.ts
import { i18n } from "@/i18n.config"
import { getDictionary } from "@/lib/getDictionary"
import { atom } from "jotai"
import { atomWithDefault } from "jotai/utils"

export const localeAtom = atom<string>(i18n.defaultLocale)

// Dictionary atom derived from the current locale
export const dictionaryAtom = atomWithDefault(async (get) => {
  const locale = get(localeAtom)
  return await getDictionary(locale)
})
