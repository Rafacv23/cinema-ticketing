import BackBtn from "@/components/BackBtn"
import { Movie } from "../page"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

export const revalidate = 60

export default async function Page() {
  const res = await fetch(`http://localhost:3000/api/movies`)

  if (!res.ok) {
    return <div>Error fetching movies.</div>
  }

  const movies = await res.json()

  return (
    <div>
      <h1 className="font-bold text-2xl">Update Movie</h1>
      <BackBtn url="/admin/manage" />
      <ul className="my-4 flex flex-col items-start gap-4">
        {movies.map((movie: Movie) => (
          <li key={movie.id}>
            <Link
              href={`/admin/manage/update/${movie.slug}`}
              className={buttonVariants({ variant: "link" })}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
