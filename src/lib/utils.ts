import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using `clsx` and merges them with `tailwind-merge` to resolve conflicts.
 * This is useful for conditionally applying Tailwind CSS classes while ensuring proper precedence.
 *
 * @param inputs - An array of class values (strings, objects, arrays, or falsy values) to be combined.
 * @returns A single string of class names, optimized for Tailwind CSS.
 *
 * @example
 * // Basic usage
 * cn('text-red-500', 'bg-blue-200'); // 'text-red-500 bg-blue-200'
 *
 * @example
 * // Conditional classes
 * cn('text-red-500', { 'bg-blue-200': isActive, 'bg-gray-200': !isActive }); // 'text-red-500 bg-blue-200' (if isActive is true)
 *
 * @example
 * // Merging conflicting Tailwind classes
 * cn('p-4', 'p-6'); // 'p-6' (last conflicting class wins)
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
