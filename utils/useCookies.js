import { parse } from 'cookie';

export function useCookieValue(context) {
  const cookies = parse(context.req.headers.cookie || '');
  return cookies.cookieName || '';
}