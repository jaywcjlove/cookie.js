export interface CookieOptions {
  expires?: number | Date | string;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'None' | 'Strict' | 'Lax';
}

export interface CookieValues {
  [key: string]: string;
}

export type CooiesAll = {
  [key: string]: string;
}

export interface Cookie {
  /**
   * Get all cookie
   */
  (): CooiesAll;
  /**
   * Create a cookie, valid across the entire site
   */
  (name?: string | CookieValues, value?: string | null | CookieOptions, options?: CookieOptions | number): string;
  get: (name: string) => string | boolean;
  set: (name?: string | CookieValues, value?: string, options?: CookieOptions | number) => undefined;
  remove: (names?: string | string[], ...ages: string[]) => string[];
  clear: (names?: string | string[], ...ages: string[]) => string[];
  all:() => CookieValues;
}

declare var cookie: Cookie
export default cookie;
