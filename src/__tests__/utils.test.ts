// formatDate.test.ts

import { describe, it, expect } from "vitest"
import { formatDate } from "../lib/utils" // Adjust the import path

describe("formatDate", () => {
  it("should format a valid ISO date string correctly", () => {
    const isoDate = "2024-10-08T12:00:00Z"
    const expected = "2024-10-08"
    const result = formatDate(isoDate)
    expect(result).toBe(expected)
  })

  it("should format a valid Date object correctly", () => {
    const date = new Date("2024-10-08T12:00:00Z")
    const expected = "2024-10-08"
    const result = formatDate(date)
    expect(result).toBe(expected)
  })

  it("should return invalid date for an invalid date string", () => {
    const invalidDate = "invalid-date-string"
    const result = formatDate(invalidDate)
    expect(result).toBe("Invalid Date") // Modify this based on your handling of invalid dates
  })
})
