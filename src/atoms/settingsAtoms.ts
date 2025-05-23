import { i18n } from '@/i18n.config';
import { getDictionary } from '@/lib/getDictionary';
import { CityIds } from '@/types/Shared';
import { atom } from 'jotai';
import { atomWithRefresh, atomWithStorage } from 'jotai/utils';
import { atomWithDefault } from 'jotai/utils';
import { MutableRefObject, createRef } from "react";

export enum Currencies {
  AED = 'aed',
  USD = 'usd',
  EUR = 'eur',
}

export enum Cities {
  ABU_DHABI = 26792,
  DUBAI = 26786,
}

export enum Sizes {
  SQ_FT = 'sq-ft',
  SQ_M = 'sq-m',
}

export type SettingsProps = {
  locale: 'en' | 'ar' | 'cn' | 'de' | 'fr' | 'it' | 'ru' | 'tr'; 
  size: Sizes;
  currency: Currencies;
  city: CityIds;
};
export const settingsDefault: SettingsProps = {
  locale: i18n.defaultLocale,
  size: Sizes.SQ_FT,
  currency: Currencies.AED,
  city: 26792,
};
export const settingsAtom = atomWithStorage<SettingsProps>(
  'settings',
  settingsDefault
);

// Dictionary atom derived from the current locale
export const dictionaryAtom = atomWithDefault(async (get) => {
  const locale = get(settingsAtom)?.locale ?? i18n.defaultLocale;
  return await getDictionary(locale as 'en' | 'ar' | 'cn' | 'de' | 'fr' | 'it' | 'ru' | 'tr');
});

export const getCity = atomWithRefresh(async (get) => {
  const city = get(settingsAtom)?.city;
  return CityIds[city];
});

export const sectionRefAtom = atom<MutableRefObject<HTMLDivElement | null>>(createRef<HTMLDivElement | null>());

export const isMobileMenuOpenAtom = atom(false);

export const openMenuIndexAtom = atom<number | null>(null);

export const VerifyRegisterCompleted = atom(false);
