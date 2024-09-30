"use client"

import { Movie } from "@/lib/types"
import Link from "next/link"
import { Calendar, Timer } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import YouTube from "react-youtube"
import { useEffect, useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"

export default function Page({ params }: { params: { slug: string } }) {
  const [isSticky, setIsSticky] = useState<boolean>(false)
  const [movie, setMovie] = useState<Movie | null>(null) // Allow for null initially
  const [loading, setLoading] = useState<boolean>(true) // Loading state
  const [error, setError] = useState<string | null>(null) // Error state

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/movies/${params.slug}`
        )
        if (!response.ok) {
          throw new Error("Movie not found")
        }
        const data = await response.json()
        setMovie(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false) // Set loading to false once fetch is complete
      }
    }

    fetchMovie()

    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [params.slug])

  if (loading) return <div>Loading...</div> // Loading state
  if (error) return <div>Error: {error}</div> // Error handling

  // If movie is null, show a message
  if (!movie) return <div>Movie not found.</div>

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start">
        <YouTube videoId={movie.trailer} />
        <div className="flex justify-between w-full items-center mb-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <Link
            href={`/${movie.slug}/cart`}
            className={buttonVariants({ variant: "default" })}
          >
            Buy tickets
          </Link>
          <span className="flex items-center gap-2">
            <Timer /> {movie.duration}
          </span>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">
              <Calendar />
            </h2>
            <p>{formatDate(movie.release)}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <Badge variant={"outline"} key={genre}>
                {genre}
              </Badge>
            ))}
          </div>
        </div>
        <Separator className="my-2" />
        <h2 className="text-xl font-bold">Description</h2>
        <p>{movie.description}</p>
        <h2 className="text-xl font-bold">Directed by</h2>
        <p>{movie.director}</p> {/* Display director correctly */}
        <h2 className="text-xl font-bold">Cast</h2>
        <p>{movie.cast.join(", ")}</p> {/* Join cast array into a string */}
        <div
          className={`fixed bottom-0 left-0 right-0 p-4 bg-black bg-opacity-75 backdrop-blur-md transition-all duration-300 ${
            !isSticky ? "translate-y-full" : "translate-y-0"
          }`}
        >
          <div className="container mx-auto flex justify-between items-center">
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <Link
              href={`/${movie.slug}/cart`}
              className={buttonVariants({ variant: "default" })}
            >
              Buy tickets
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
