"use client"

import { useState } from "react"
import createTicket from "@/app/movie/[slug]/cart/actions"
import { SeatGrid } from "@/components/SeatGrid"

interface SeatFormProps {
  movieId: string
  userId: string
  occupiedSeats: string[]
}

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <button
      type="submit"
      className={`px-4 py-2 rounded-md text-white transition duration-200 ${
        isSubmitting ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
      }`}
      aria-disabled={isSubmitting}
    >
      {isSubmitting ? "Reserving..." : "Reserve"}
    </button>
  )
}

export default function Reserve({
  movieId,
  userId,
  occupiedSeats,
}: SeatFormProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string>("")

  const handleSeatSelect = (seat: string) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat)
        ? prevSeats.filter((s) => s !== seat)
        : [...prevSeats, seat]
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const payload = {
      movieId,
      userId,
      seats: selectedSeats,
    }

    try {
      const result = await createTicket(payload)
      if (result.message) {
        setMessage("Ticket reserved successfully!")
      } else {
        setMessage("Failed to reserve ticket.")
      }
    } catch (error) {
      console.error("Error reserving ticket:", error)
      setMessage("An error occurred while reserving the ticket.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <SeatGrid
        selectedSeats={selectedSeats}
        onSeatSelect={handleSeatSelect}
        occupiedSeats={occupiedSeats}
      />
      <SubmitButton isSubmitting={isSubmitting} />
      <p className="mt-4 text-lg text-center" aria-live="polite" role="status">
        {message}
      </p>
    </form>
  )
}
