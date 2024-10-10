import BackBtn from "@/components/buttons/BackBtn"
import TicketsTable from "@/components/TicketsTable"
import { buttonVariants } from "@/components/ui/button"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function ProtectPage() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL

  if (!user || user.email !== ADMIN_EMAIL) {
    return notFound()
  }

  const res = await fetch(`http://localhost:3000/api/tickets/admin`)
  const tickets = await res.json()

  return (
    <div className="grid gap-4">
      <header className="flex justify-between items-center">
        <BackBtn url="/" />
        <Link
          href="/admin/manage"
          className={buttonVariants({ variant: "default" })}
        >
          Manage
        </Link>
      </header>
      <TicketsTable tickets={tickets} user={false} />
    </div>
  )
}
