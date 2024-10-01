"use client"

interface SeatProps {
  seat: string
  occupied: boolean
  onSelect: (seat: string) => void
  isSelected: boolean
}

export function Seat({ seat, occupied, onSelect, isSelected }: SeatProps) {
  const handleClick = () => {
    if (!occupied) onSelect(seat)
  }

  return (
    <div
      className={`seat w-12 h-12 flex items-center justify-center border-2 rounded-md cursor-pointer transition-all duration-200 mx-2 my-2 ${
        occupied
          ? "bg-red-500 border-red-700 cursor-not-allowed"
          : isSelected
          ? "bg-green-500 border-green-700"
          : "bg-gray-300 border-gray-400 hover:bg-gray-400"
      }`}
      onClick={handleClick}
      aria-label={`Seat ${seat} ${
        occupied ? "occupied" : isSelected ? "selected" : "available"
      }`}
    >
      {seat}
    </div>
  )
}
