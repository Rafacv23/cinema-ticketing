import BackBtn from "@/components/buttons/BackBtn"
import { Movie } from "../page"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { SITE_URL } from "@/site/config"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { notFound } from "next/navigation"

export const revalidate = 60

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
