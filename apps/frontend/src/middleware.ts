// in apps/frontend/src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n'; // Import locales from your new config file
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
 
  // Used when no locale matches
  defaultLocale: 'en',
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|fr|en)/:path*'],
};