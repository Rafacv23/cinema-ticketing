"use client"

import { useState, useEffect } from "react"
import createTicket from "@/app/movie/[slug]/cart/actions"
import { SeatGrid } from "@/components/SeatGrid"
import { buttonVariants } from "./ui/button"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"

interface SeatFormProps {
  movieId: string
  userId: string
  occupiedSeatsData: { seats: string[]; date: string }[]
  moviePrice: number
}

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={buttonVariants({
        variant: "default",
      })}
      aria-disabled={isSubmitting}
    >
      {isSubmitting ? "Reserving..." : "Reserve"}
    </button>
  )
}

export default function Reserve({
  movieId,
  userId,
  occupiedSeatsData,
  moviePrice,
}: SeatFormProps) {
  const today = new Date().toISOString().split("T")[0]
  const router = useRouter()

  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<string>(today)
  const [filteredOccupiedSeats, setFilteredOccupiedSeats] = useState<string[]>(
    []
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string>("")

  const handleSeatSelect = (seat: string) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat)
        ? prevSeats.filter((s) => s !== seat)
        : [...prevSeats, seat]
    )
  }

  // Filter the occupied seats based on the selected date and time
  useEffect(() => {
    setSelectedSeats([]) // Reset selected seats

    const filteredSeats = occupiedSeatsData
      .filter(
        (ticket) =>
          new Date(ticket.date).toISOString().split("T")[0] === selectedDate
      )
      .flatMap((ticket) => ticket.seats)

    setFilteredOccupiedSeats(filteredSeats)
  }, [selectedDate, occupiedSeatsData])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const totalPrice = selectedSeats.length * moviePrice

    const payload = {
      movieId,
      userId,
      date: selectedDate,
      seats: selectedSeats,
      price: totalPrice,
    }

    try {
      const result = await createTicket(payload)
      if (result.message) {
        setMessage("Ticket reserved successfully!")
        router.push(`/confirm/${result.ticketId}`)
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
      <Input
        type="date"
        id="showtime"
        className="pl-10 grid"
        min={today}
        value={selectedDate}
        style={{
          colorScheme: "dark",
        }}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <SeatGrid
        selectedSeats={selectedSeats}
        onSeatSelect={handleSeatSelect}
        occupiedSeats={filteredOccupiedSeats}
      />
      <p className="mt-4">Total Price: ${selectedSeats.length * moviePrice}</p>
      <SubmitButton isSubmitting={isSubmitting} />
      <p className="mt-4 text-lg text-center" aria-live="polite" role="status">
        {message}
      </p>
    </form>
  )
}
