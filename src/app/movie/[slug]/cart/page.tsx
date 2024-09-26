"use client"

import { Movie } from "@/lib/types"
import { usePathname } from "next/navigation"
import { createMatrix3x3, SeatMap, SeatMapProvider } from "simple-seat-picker"
import "simple-seat-picker/dist/style.css"

const testMovie: Movie = {
  slug: "spiderman-no-way-home",
  title: "Spider-Man: No Way Home",
  img: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  genres: ["Sci-fi", "Animation", "Superheroes"],
  description:
    "Peter Parker busca la ayuda de Doctor Strange cuando su identidad es revelada.",
  trailer: "b_yMOiRgMmQ",
  director: "Tarantino",
  cast: ["Di Caprio", "Stallone"],
  released: "05/05/2024",
  ends: "25/05/2024",
  price: 6.99,
}

export default function Page() {
  const pathname = usePathname()

  console.log(testMovie)

  console.log(pathname)
  const data = createMatrix3x3({ row: 0, column: 1 })
  const reserved = ["B28", "B29", "B30"]

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start">
        <SeatMapProvider>
          <SeatMap size={data.size} cells={data.cells} reserved={reserved} />
        </SeatMapProvider>
      </div>
    </div>
  )
}
