import AddMovieForm from "@/components/AddMovieForm"
import BackBtn from "@/components/BackBtn"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { notFound } from "next/navigation"

export default async function CreateMovie() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL

  if (!user || user.email !== ADMIN_EMAIL) {
    return notFound()
  }

  return (
    <div className="grid gap-4">
      <BackBtn url="/admin" />
      <AddMovieForm />
    </div>
  )
}
