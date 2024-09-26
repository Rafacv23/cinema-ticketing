import MoviesCarousel from "@/components/MoviesCarousel"
import { Movie } from "@/lib/types"
import Footer from "@/components/Footer"

const movies: Movie[] = [
  {
    slug: "spiderman-no-way-home",
    title: "Spider-Man: No Way Home",
    img: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    description:
      "Peter Parker busca la ayuda de Doctor Strange cuando su identidad es revelada.",
  },
  {
    slug: "avengers-endgame",
    title: "Avengers: Endgame",
    img: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    description:
      "Los Vengadores se reúnen para intentar revertir las acciones de Thanos.",
  },
  {
    slug: "the-batman",
    title: "The Batman",
    img: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    description:
      "Bruce Wayne en su segundo año como Batman enfrenta a un asesino llamado el Acertijo.",
  },
  {
    slug: "dune",
    title: "Dune",
    img: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    description:
      "Un joven noble se convierte en el líder de un planeta desértico que es clave para la supervivencia del universo.",
  },
  {
    slug: "no-time-to-die",
    title: "No Time to Die",
    img: "https://image.tmdb.org/t/p/w500/iUgygt3fscRoKWCV1d0C7FbM9TP.jpg",
    description:
      "James Bond ha dejado el servicio activo, pero su paz se ve interrumpida por un peligroso villano.",
  },
]

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <MoviesCarousel movies={movies} />
      </main>
      <Footer />
    </div>
  )
}
