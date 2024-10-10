import MoviesList from "@/components/MoviesList"
import { SITE_URL } from "@/site/config"

export default async function Home() {
  const res = await fetch(`${SITE_URL}/api/movies/soon`)

  const movies = await res.json()

  return <MoviesList inTheaters={false} movies={movies} />
}
