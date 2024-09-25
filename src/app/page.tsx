import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"

const movies = [
  {
    slug: "spiderman-no-way-home",
    title: "Spider-Man: No Way Home",
    image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    description:
      "Peter Parker busca la ayuda de Doctor Strange cuando su identidad es revelada.",
  },
  {
    slug: "avengers-endgame",
    title: "Avengers: Endgame",
    image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    description:
      "Los Vengadores se reúnen para intentar revertir las acciones de Thanos.",
  },
  {
    slug: "the-batman",
    title: "The Batman",
    image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    description:
      "Bruce Wayne en su segundo año como Batman enfrenta a un asesino llamado el Acertijo.",
  },
  {
    slug: "dune",
    title: "Dune",
    image: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    description:
      "Un joven noble se convierte en el líder de un planeta desértico que es clave para la supervivencia del universo.",
  },
  {
    slug: "no-time-to-die",
    title: "No Time to Die",
    image: "https://image.tmdb.org/t/p/w500/iUgygt3fscRoKWCV1d0C7FbM9TP.jpg",
    description:
      "James Bond ha dejado el servicio activo, pero su paz se ve interrumpida por un peligroso villano.",
  },
]

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Carousel
          className="w-full max-w-xs"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent>
            {movies.map((movie) => (
              <CarouselItem key={movie.title}>
                <Link href={`/${movie.slug}`}>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <img src={movie.image} />
                    </CardContent>
                    <CardFooter>
                      <span className="text-4xl font-semibold">
                        {movie.title}
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  )
}
