import { i18n } from "@/i18n.config"
import { getDictionary } from "@/lib/getDictionary"
import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { atomWithDefault } from "jotai/utils"

export enum Currencies {
  AED = "aed",
  USD = "usd",
  EUR = "eur",
}

export enum Cities {
  ABU_DHABI = 26792,
  DUBAI = 26786,
}

export type SettingsProps = {
  locale: string
  size: "sq-ft" | "sq-m"
  currency: Currencies
  city: Cities
}
export const settingsDefault: SettingsProps = {
  locale: i18n.defaultLocale,
  size: "sq-ft",
  currency: Currencies.AED,
  city: 26792,
}
export const settingsAtom = atomWithStorage<SettingsProps>(
  "settings",
  settingsDefault
)

// Dictionary atom derived from the current locale
export const dictionaryAtom = atomWithDefault(async (get) => {
  console.log("test")
  const locale = get(settingsAtom)?.locale ?? i18n.defaultLocale
  return await getDictionary(locale)
})
