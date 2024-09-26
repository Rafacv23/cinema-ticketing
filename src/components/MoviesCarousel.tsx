import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Movie } from "@/lib/types"

interface MoviesCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  movies: Movie[]
}

export default function MoviesCarousel({ movies }: MoviesCarouselProps) {
  return (
    <Carousel
      className="w-full max-w-xs md:max-w-xl"
      opts={{
        align: "center",
        loop: true,
      }}
    >
      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem key={movie.title} className="md:basis-2/3">
            <Link href={`/${movie.slug}`}>
              <Card className="hover:text-accent transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300  shadow-xl">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <img src={movie.img} className="rounded-xl" />
                </CardContent>
                <CardFooter>
                  <h2 className="text-2xl font-semibold">{movie.title}</h2>
                </CardFooter>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
