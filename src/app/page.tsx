import Footer from "@/components/Footer"
import MoviesList from "@/components/MoviesList"

export default async function Home() {
  const movies = await fetch("http://localhost:3000/api/movies/current").then(
    (res) => res.json()
  )

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start">
        <MoviesList inTheaters={true} movies={movies} />
      </main>
      <Footer />
    </div>
  )
}
