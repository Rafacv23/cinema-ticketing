"use client"

import { Seat } from "./Seat"

interface SeatGridProps {
  selectedSeats: string[]
  occupiedSeats: string[]
  onSeatSelect: (seat: string) => void
}

export function SeatGrid({
  selectedSeats,
  occupiedSeats,
  onSeatSelect,
}: SeatGridProps) {
  const seats = [
    ["1A", "1B", "1C", "1D"],
    ["2A", "2B", "2C", "2D"],
    ["3A", "3B", "3C", "3D"],
  ]

  return (
    <div className="container mx-auto my-6">
      <div className="screen bg-gray-800 h-8 mb-4 rounded-md"></div>
      {seats.map((row, rowIndex) => (
        <div className="flex justify-center mb-2" key={rowIndex}>
          {row.map((seat) => (
            <Seat
              key={seat}
              seat={seat}
              occupied={occupiedSeats.includes(seat)} // Check if the seat is occupied
              onSelect={onSeatSelect}
              isSelected={selectedSeats.includes(seat)} // Check if the seat is selected
            />
          ))}
        </div>
      ))}
    </div>
  )
}
