import { customAlphabet } from "nanoid";

/**
 * Generate secure unique ID with custom alphabet and max length of 21.
 *
 * The custom alphabet is as follows: 346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz.
 *
 * This contains no characters that can be mistaken for each other such as lower case 'l' and uppercase 'i'
 *
 * @function
 * @returns unique ID
 * @example
 * element.id = nanoid()
 */
export const nanoid = customAlphabet("346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz", 21);
