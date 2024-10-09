import { useState, useEffect } from "react"

interface ReservationProps {
  movieId: string
  userId: string
  moviePrice: number
  occupiedSeatsData: { seats: string[]; date: string; time: string }[]
}

export function useReservation({
  movieId,
  userId,
  moviePrice,
  occupiedSeatsData,
}: ReservationProps) {
  const today = new Date().toISOString().split("T")[0]
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [selectedDate, setSelectedDate] = useState<string>(today)
  const [selectedTime, setSelectedTime] = useState<string>("12:00")
  const [filteredOccupiedSeats, setFilteredOccupiedSeats] = useState<string[]>(
    []
  )
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    setSelectedSeats([]) // Reset selected seats

    const filteredSeats = occupiedSeatsData
      .filter(
        (ticket) =>
          new Date(ticket.date).toISOString().split("T")[0] === selectedDate &&
          ticket.time === selectedTime
      )
      .flatMap((ticket) => ticket.seats)

    setFilteredOccupiedSeats(filteredSeats)
  }, [selectedDate, selectedTime, occupiedSeatsData])

  const handleSeatSelect = (seat: string) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat)
        ? prevSeats.filter((s) => s !== seat)
        : [...prevSeats, seat]
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type, @typescript-eslint/no-explicit-any
  const handleSubmit = async (createTicket: Function, router: any) => {
    setIsSubmitting(true)
    const totalPrice = selectedSeats.length * moviePrice

    const payload = {
      movieId,
      userId,
      date: selectedDate,
      time: selectedTime,
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

  return {
    selectedSeats,
    setSelectedSeats,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    filteredOccupiedSeats,
    isSubmitting,
    message,
    handleSeatSelect,
    handleSubmit,
  }
}
