import Link from "next/link"
import { Calendar, Timer } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import StickyBuyBtn from "@/components/StickyBuyBtn"
import YouTubePlayer from "@/components/YoutubePlayer"
import CartBtn from "@/components/CartBtn"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import BackBtn from "@/components/BackBtn"

export default async function Page({ params }: { params: { slug: string } }) {
  // Fetch the movie data based on the slug
  const response = await fetch(
    `http://localhost:3000/api/movies/${params.slug}`
  )

  const { getUser } = getKindeServerSession()
  const user = await getUser()
  let isLogged = false

  if (user) isLogged = true

  // Check if the response is ok
  if (!response.ok) {
    return <div>Movie not found.</div>
  }

  const movie = await response.json()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start">
        <BackBtn url={`/`} />
        <YouTubePlayer movieTrailer={movie.trailer} />
        <div className="flex justify-between w-full items-center mb-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          {user ? (
            <Link
              href={`/movie/${movie.slug}/cart`}
              className={buttonVariants({ variant: "default" })}
            >
              Buy tickets
            </Link>
          ) : (
            <CartBtn />
          )}
          <span className="flex items-center gap-2">
            <Timer /> {movie.duration} min
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
            {movie.genres.map((genre: string) => (
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
        <p>{movie.director}</p>
        <h2 className="text-xl font-bold">Cast</h2>
        <p>{movie.cast.join(", ")}</p>
        <StickyBuyBtn
          movieSlug={movie.slug}
          movieTitle={movie.title}
          isLogged={isLogged}
        />
      </div>
    </div>
  )
}
