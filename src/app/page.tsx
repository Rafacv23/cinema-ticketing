import MoviesList from "@/components/MoviesList"
import { SITE_URL } from "@/site/config"

export default async function Home() {
  const res = await fetch(`${SITE_URL}/api/movies/current`)

  const movies = await res.json()

  return <MoviesList inTheaters={true} movies={movies} />
}
