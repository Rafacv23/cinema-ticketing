"use client"

import { buttonVariants } from "./ui/button"

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
          ? buttonVariants({ variant: "destructive" })
          : isSelected
          ? buttonVariants({ variant: "secondary" })
          : buttonVariants({ variant: "outline" })
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
