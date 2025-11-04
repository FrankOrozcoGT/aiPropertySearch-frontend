import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merge Tailwind CSS classes without conflicts
 * Used only in presentation layer for styling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
