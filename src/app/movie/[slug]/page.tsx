import Link from "next/link"
import { Calendar, Timer } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import StickyBuyBtn from "@/components/buttons/StickyBuyBtn"
import YouTubePlayer from "@/components/YoutubePlayer"
import CartBtn from "@/components/buttons/CartBtn"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import BackBtn from "@/components/buttons/BackBtn"

export default async function Page({ params }: { params: { slug: string } }) {
  // Fetch the movie data based on the slug
  const response = await fetch(
    `http://localhost:3000/api/movies/${params.slug}`
  )

  const today = formatDate(new Date())
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
    <div className="w-full grid gap-4">
      <YouTubePlayer movieTrailer={movie.trailer} />
      <div className="flex flex-col md:flex-row justify-start space-x-4 w-full items-start md:items-center gap-4 md:gap-0 mb-4">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        {movie.release > today ? null : user ? (
          <Link
            href={`/movie/${movie.slug}/cart`}
            className={buttonVariants({ variant: "default" })}
          >
            Buy tickets
          </Link>
        ) : (
          <CartBtn />
        )}
        <BackBtn url={`/`} />
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:gap-0 justify-between w-full">
        <div className="flex gap-4">
          <Badge variant={"outline"} className="flex items-center gap-2">
            <Timer /> {movie.duration} min
          </Badge>
          <Badge variant={"outline"} className="flex items-center gap-2">
            <h2 className="text-xl font-bold">
              <Calendar />
            </h2>
            <p>{formatDate(movie.release)}</p>
          </Badge>
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
      {movie.release > today ? null : (
        <StickyBuyBtn
          movieSlug={movie.slug}
          movieTitle={movie.title}
          isLogged={isLogged}
        />
      )}
    </div>
  )
}
