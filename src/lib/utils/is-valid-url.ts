/**
 * Checks if a given string is a valid URL.
 *
 * @param url - The URL string to validate. Can be a string, null, or undefined.
 * @returns Returns `true` if the input is a valid URL, otherwise returns `false`.
 *
 * @example
 * // Returns true
 * isValidUrl('https://www.example.com');
 * isValidUrl('http://localhost:3000');
 *
 * @example
 * // Returns false
 * isValidUrl(null);
 * isValidUrl(undefined);
 * isValidUrl('not-a-url');
 * isValidUrl('example.com'); // Missing protocol
 */
export const isValidUrl = (url: string | null | undefined): boolean => {
  if (!url) return false;

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
