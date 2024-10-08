import BackBtn from "@/components/BackBtn"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

export interface Movie {
  id: string
  title: string
  slug: string
}

export default async function Page() {
  const res = await fetch(`http://localhost:3000/api/movies`)

  if (!res.ok) {
    return <div>Error fetching movies.</div>
  }

  const movies = await res.json()

  return (
    <div>
      <nav className="flex gap-4 mb-4">
        <BackBtn url="/admin" />
        <Link
          href="/admin/manage/create"
          className={buttonVariants({ variant: "default" })}
        >
          Create
        </Link>
        <Link
          href="/admin/manage/update"
          className={buttonVariants({ variant: "default" })}
        >
          Update
        </Link>
        <Link
          href="/admin/manage/delete"
          className={buttonVariants({ variant: "destructive" })}
        >
          Delete
        </Link>
      </nav>
      <h2 className="text-2xl font-bold">Movies</h2>
      <ul className="my-4 flex flex-col items-start gap-4">
        {movies.map((movie: Movie) => (
          <li key={movie.id} className={buttonVariants({ variant: "ghost" })}>
            <Link href={`/movie/${movie.slug}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
