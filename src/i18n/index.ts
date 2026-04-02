import en from './locales/en.json';
import tr from './locales/tr.json';

const translations: Record<string, typeof en> = { en, tr };

const defaultLocale = 'en';

type NestedKeyOf<T, Prefix extends string = ''> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? NestedKeyOf<T[K], `${Prefix}${K}.`>
        : `${Prefix}${K}`;
    }[keyof T & string]
  : never;

export type TranslationKey = NestedKeyOf<typeof en>;

/** Get a translation value by dot-notation key */
export function t(locale: string, key: TranslationKey): string {
  const lang = translations[locale] || translations[defaultLocale];
  const keys = key.split('.');
  let result: unknown = lang;

  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      return key; // Fallback to key if not found
    }
  }

  return typeof result === 'string' ? result : key;
}

/** Get the current locale from a URL path */
export function getLocaleFromUrl(url: URL): string {
  const [, lang] = url.pathname.split('/');
  if (lang && lang in translations) return lang;
  return defaultLocale;
}

/** Get all translations for a locale (for passing to framework components) */
export function useTranslations(locale: string) {
  return (key: TranslationKey) => t(locale, key);
}

export { defaultLocale, translations };
