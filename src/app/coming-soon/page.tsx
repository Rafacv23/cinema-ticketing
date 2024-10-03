import MoviesList from "@/components/MoviesList"

export default async function Home() {
  const movies = await fetch("http://localhost:3000/api/movies/soon").then(
    (res) => res.json()
  )

  return <MoviesList inTheaters={false} movies={movies} />
}
