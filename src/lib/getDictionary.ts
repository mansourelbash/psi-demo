export const getDictionary = async (locale: string) => {
  try {
    const dictionary = await import(`../dictionaries/${locale}.json`)
    return dictionary.default
  } catch (error) {
    console.error(`Error loading dictionary for locale "${locale}":`, error)
    return {}
  }
}
