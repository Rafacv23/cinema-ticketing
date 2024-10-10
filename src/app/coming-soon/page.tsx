import MoviesList from "@/components/MoviesList"
import { SITE_URL } from "@/site/config"

export default async function Home() {
  const movies = await fetch(`${SITE_URL}/api/movies/soon`).then((res) =>
    res.json()
  )

  return <MoviesList inTheaters={false} movies={movies} />
}
