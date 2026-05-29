import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/((?!api|studio|sitemap.xml|robots.txt|_next|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|ico|webp|woff2?|ttf|eot)).*)',
  ],
};
