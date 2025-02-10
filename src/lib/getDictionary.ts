import { dictionaries } from "@/dictionaries/dictionaries";
import { Locale } from "@/i18n.config";

export const getDictionary = async (locale: Locale) => {
  try {
    const dictionary = dictionaries[locale];
    if (!dictionary) {
      throw new Error(`No dictionary found for locale "${locale}"`);
    }
    return dictionary;
  } catch (error) {
    console.error(`Error loading dictionary for locale "${locale}":`, error);
    return {};
  }
};
