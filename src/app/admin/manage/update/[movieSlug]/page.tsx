import BackBtn from "@/components/BackBtn"
import UpdateMovieForm from "@/components/UpdateMovieForm"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { notFound } from "next/navigation"

export default async function UpdateMovie({
  params,
}: {
  params: { movieSlug: string }
}) {
  const movieSlug = params.movieSlug // Ensure this slug is being passed correctly
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL

  if (!user || user.email !== ADMIN_EMAIL) {
    return notFound()
  }

  // Check if movieSlug is valid before fetching
  if (!movieSlug) {
    return notFound() // Handle missing slug gracefully
  }

  const res = await fetch(`http://localhost:3000/api/movies/${movieSlug}`)

  // Check if the response is ok and handle errors
  if (!res.ok) {
    const errorMessage = await res.text() // Get the error message from the response
    console.error(errorMessage) // Log the error message for debugging
    return notFound() // Handle the error gracefully
  }

  const movieData = await res.json()

  return (
    <div className="grid gap-4">
      <h1 className="font-bold text-2xl">Update Movie</h1>
      <BackBtn url="/admin/manage/update" />
      <UpdateMovieForm slug={movieSlug} movieData={movieData} />
    </div>
  )
}
