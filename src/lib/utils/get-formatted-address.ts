import { TLocation } from "../schema";

/**
 * Generates a formatted address string from a location object.
 * The address is constructed using the city and country properties of the location.
 * If the city is present, it is used as the primary part of the address, followed by the country (if available).
 * If only the country is present, it is used as the address.
 * If neither city nor country is available, the function returns "unknown location".
 *
 * @param location - The location object containing city and country properties.
 * @returns A formatted address string (e.g., "New York, USA" or "unknown location").
 *
 * @example
 * const location = { city: "New York", country: "USA" };
 * const address = getFormattedAddress(location);
 * console.log(address); // Output: "New York, USA"
 *
 * @example
 * const location = { city: null, country: "Canada" };
 * const address = getFormattedAddress(location);
 * console.log(address); // Output: "Canada"
 *
 * @example
 * const location = { city: null, country: null };
 * const address = getFormattedAddress(location);
 * console.log(address); // Output: "unknown location"
 */
export const getFormattedAddress = (location: TLocation) => {
  let address;

  if (location.city) {
    address = location.city;
    address += location.country ? `, ${location.country}` : "";
  } else if (location.country) {
    address = location.country;
  } else {
    address = "unknown location";
  }
  return address;
};
