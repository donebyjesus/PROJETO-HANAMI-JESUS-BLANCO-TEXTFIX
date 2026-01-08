import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina classes CSS usando clsx e tailwind-merge
 * para evitar conflitos de classes do Tailwind
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
