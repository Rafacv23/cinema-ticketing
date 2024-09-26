import { Movie } from "@/lib/types"
import MovieCard from "./MovieCard"

export interface MoviesCarouselProps
  extends React.HTMLAttributes<HTMLDivElement> {
  movies: Movie[]
}

export default function MoviesCarousel({ movies }: MoviesCarouselProps) {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6">Now in theaters</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <MovieCard key={movie.slug} movie={movie} />
        ))}
      </ul>
    </div>
  )
}
