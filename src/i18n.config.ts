export const i18n = {
  defaultLocale: 'en',
  locales: ['ar', 'cn', 'de', 'en', 'fr', 'it', 'ru', 'tr'],
} as const;

export const langs = [
  { locale: 'en', name: 'English' },
  { locale: 'ar', name: 'Arabic' },
  { locale: 'ru', name: 'Russian' },
  { locale: 'cn', name: 'Chinese' },
  { locale: 'de', name: 'German' },
  { locale: 'fr', name: 'French' },
  { locale: 'tr', name: 'Turkish' },
  { locale: 'it', name: 'Italian' },
];

export type Locale = (typeof i18n)['locales'][number];
