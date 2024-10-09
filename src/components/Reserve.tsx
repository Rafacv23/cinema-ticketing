"use client"

import { useState, useEffect } from "react"
import createTicket from "@/app/movie/[slug]/cart/actions"
import { SeatGrid } from "@/components/SeatGrid"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import SubmitBtn from "@/components/buttons/SubmitBtn"

interface SeatFormProps {
  movieId: string
  userId: string
  moviePrice: number
  occupiedSeatsData: { seats: string[]; date: string; time: string }[] // Add time
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
  const [selectedTime, setSelectedTime] = useState<string>("12:00") // Initial time
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
          new Date(ticket.date).toISOString().split("T")[0] === selectedDate &&
          ticket.time === selectedTime // Match both date and time
      )
      .flatMap((ticket) => ticket.seats)

    setFilteredOccupiedSeats(filteredSeats)
  }, [selectedDate, selectedTime, occupiedSeatsData])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const totalPrice = selectedSeats.length * moviePrice

    const payload = {
      movieId,
      userId,
      date: selectedDate, // Use the formatted ISO datetime
      time: selectedTime,
      seats: selectedSeats,
      price: totalPrice, // Set a price, adjust accordingly
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

      {/* Time selector */}
      <select
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
        className="mt-2 mb-4 p-2 border rounded"
        style={{
          colorScheme: "dark",
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const time = `${String(i + 12).padStart(2, "0")}:00`
          return (
            <option key={time} value={time}>
              {time}
            </option>
          )
        })}
      </select>

      <SeatGrid
        selectedSeats={selectedSeats}
        onSeatSelect={handleSeatSelect}
        occupiedSeats={filteredOccupiedSeats}
      />
      <SubmitBtn
        isSubmitting={isSubmitting}
        price={selectedSeats.length * moviePrice}
      />
      <p className="mt-4 text-lg text-center" aria-live="polite" role="status">
        {message}
      </p>
    </form>
  )
}
