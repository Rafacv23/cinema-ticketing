import { Movie } from "@/lib/types"
import MovieCard from "./MovieCard"

interface MovieRecommendationProps {
  movie: Movie
}

export function MovieRecommendation({ movie }: MovieRecommendationProps) {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-6">Daily recomendation</h2>
      <div className="flex justify-center">
        <MovieCard movie={movie} />
      </div>
    </section>
  )
}
