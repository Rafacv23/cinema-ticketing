import BackBtn from "@/components/buttons/BackBtn"
import { buttonVariants } from "@/components/ui/button"
import { SITE_URL } from "@/site/config"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Link from "next/link"
import { notFound } from "next/navigation"

export interface Movie {
  id: string
  title: string
  slug: string
}

export default async function Page() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL

  if (!user || user.email !== ADMIN_EMAIL) {
    return notFound()
  }

  const res = await fetch(`${SITE_URL}/api/movies`)

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
