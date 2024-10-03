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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] place-content-center">
      <div className="flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start">
        <BackBtn url="/admin" />
        <AddMovieForm />
      </div>
    </div>
  )
}
