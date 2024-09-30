import { Movie } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.slug}`}>
      <Card
        className="w-64 overflow-hidden mx-auto h-[480px]"
        key={movie.title}
      >
        <CardContent className="p-0 flex flex-col h-full">
          <img
            src={movie.poster}
            alt={`Póster de ${movie.title}`}
            className="w-full h-80 object-cover"
          />
          <div className="p-4 flex flex-col justify-end flex-grow">
            {movie.lastWeek && (
              <small className="text-red-500 text-sm mt-2 text-start">
                Last week!
              </small>
            )}
            <h3 className="font-bold text-lg mb-2">{movie.title}</h3>
            <Button className="w-full mt-auto">Buy tickets</Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
