"use client"

import { Movie } from "@/lib/types"
import Link from "next/link"
import { Calendar, Star } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import YouTube from "react-youtube"
import { useEffect, useState } from "react"
import { buttonVariants } from "@/components/ui/button"

const testMovie: Movie = {
  slug: "spiderman-no-way-home",
  title: "Spider-Man: No Way Home",
  img: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  genres: ["Sci-fi", "Animation", "Superheroes"],
  description:
    "Peter Parker busca la ayuda de Doctor Strange cuando su identidad es revelada.",
  lastWeek: true,
  trailer: "b_yMOiRgMmQ",
  released: "05/12/2015",
}

export default function Page({ params }: { params: { slug: string } }) {
  const [isSticky, setIsSticky] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  console.log(params.slug)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start">
        <YouTube videoId={testMovie.trailer} />
        <div className="flex justify-between w-full items-center mb-4">
          <h1 className="text-3xl font-bold">{testMovie.title}</h1>
          <Link
            href={`/${testMovie.slug}/cart`}
            className={buttonVariants({ variant: "default" })}
          >
            Buy tickets
          </Link>
          <span className="flex items-center gap-2">
            <Star /> 9,5
          </span>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">
              <Calendar />
            </h2>
            <p>{testMovie.released}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {testMovie.genres.map((genre) => (
              <Badge variant={"outline"} key={genre}>
                {genre}
              </Badge>
            ))}
          </div>
        </div>
        <Separator className="my-2" />
        <h2 className="text-xl font-bold">Description</h2>
        <p>{testMovie.description}</p>
        <h2 className="text-xl font-bold">Directed by</h2>
        <p>{testMovie.description}</p>
        <h2 className="text-xl font-bold">Cast</h2>
        <p>{testMovie.description}</p>
        <div
          className={`fixed bottom-0 left-0 right-0 p-4 bg-black bg-opacity-75 backdrop-blur-md transition-all duration-300 ${
            !isSticky ? "translate-y-full" : "translate-y-0"
          }`}
        >
          <div className="container mx-auto flex justify-between items-center">
            <h2 className="text-xl font-semibold">{testMovie.title}</h2>
            <Link
              href={`/${testMovie.slug}/cart`}
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
