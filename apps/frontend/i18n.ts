import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'fr', 'ar'];

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
      // This could be a redirect to a default locale, but for now we'll just throw an error
      // In a real app, you'd want a more graceful fallback.
      throw new Error(`Invalid locale: ${locale}`);
  }

  return {
    messages: (await import(`./i18n/${locale}.json`)).default
  };
});
