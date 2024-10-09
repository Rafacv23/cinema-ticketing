import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(isoDate: string | Date): string {
  // Create a Date object from the ISO date string
  const date = new Date(isoDate)

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date" // Return a meaningful message for invalid dates
  }

  // Extract the year, month, and day
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0") // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0")

  // Return formatted date as YYYY-MM-DD
  return `${year}-${month}-${day}`
}
