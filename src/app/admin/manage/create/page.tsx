import AddMovieForm from "@/components/forms/AddMovieForm"
import BackBtn from "@/components/buttons/BackBtn"
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
      <h1 className="font-bold text-2xl">Create Movie</h1>
      <BackBtn url="/admin/manage" />
      <AddMovieForm />
    </div>
  )
}
