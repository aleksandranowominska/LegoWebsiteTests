export const getTokenFromCookies = (cookies: { name: string, value: string }[]): string => {
  const tokenCookie = cookies.find(cookie => cookie.name === 'gqauth');
  if (!tokenCookie || !tokenCookie.value) {
    throw new Error('No cookie with token found!');
  }
  return tokenCookie.value;
};