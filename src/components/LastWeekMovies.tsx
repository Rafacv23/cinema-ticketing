import MovieCard from "./MovieCard"
import { MoviesCarouselProps } from "./MoviesCarousel"

export default function LastWeekMovies({ movies }: MoviesCarouselProps) {
  return (
    <section className="py-12 w-full">
      <h2 className="text-3xl font-bold mb-6">Last week in theaters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.title} movie={movie} />
        ))}
      </div>
    </section>
  )
}
