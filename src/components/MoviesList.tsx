import { Movie } from "@/lib/types"
import MovieCard from "./MovieCard"

export interface MoviesCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  movies: Movie[]
  inTheaters: boolean
}

export default function MoviesList({
  movies,
  inTheaters,
}: MoviesCarouselProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        {inTheaters ? "Now in theaters" : "Coming soon"}
      </h2>
      <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <MovieCard key={movie.slug} movie={movie} />
        ))}
      </ul>
    </div>
  )
}
