"use client"

import { SeatGrid } from "@/components/SeatGrid"
import { useRouter } from "next/navigation"
import SubmitBtn from "@/components/buttons/SubmitBtn"
import TimeSelect from "@/components/TimeSelect"
import { useReservation } from "@/hooks/useReservation"
import DatePicker from "@/components/DatePicker"
import createTicket from "@/app/movie/[slug]/cart/actions"

interface SeatFormProps {
  movieId: string
  userId: string
  moviePrice: number
  occupiedSeatsData: { seats: string[]; date: string; time: string }[]
}

export default function Reserve({
  movieId,
  userId,
  occupiedSeatsData,
  moviePrice,
}: SeatFormProps) {
  const router = useRouter()

  const {
    selectedSeats,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    filteredOccupiedSeats,
    isSubmitting,
    message,
    handleSeatSelect,
    handleSubmit,
  } = useReservation({ movieId, userId, moviePrice, occupiedSeatsData })

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        handleSubmit(createTicket, router)
      }}
      className="flex flex-col items-center"
    >
      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        today={new Date().toISOString().split("T")[0]}
      />

      <TimeSelect
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />

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
