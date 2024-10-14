import BackBtn from "@/components/buttons/BackBtn"
import TicketsTable from "@/components/TicketsTable"
import { buttonVariants } from "@/components/ui/button"
import { SITE_URL } from "@/site/config"
import {
  getKindeServerSession,
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server"

export interface Ticket {
  id: string
  status: string
  movieId: string
  seats: string[]
  date: Date
  createdAt: Date
  time: string
  price: number
}

export default async function Page() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    return (
      <div className="flex flex-col gap-4">
        <BackBtn url="/" />
        User not found.
        <div className="flex justify-between">
          <LoginLink className={buttonVariants({ variant: "default" })}>
            Log in
          </LoginLink>
          <RegisterLink className={buttonVariants({ variant: "outline" })}>
            Register
          </RegisterLink>
        </div>
      </div>
    )
  }

  const res = await fetch(`${SITE_URL}/api/tickets/${user.id}`)

  // Check if response is ok
  if (!res.ok) {
    return <div>Error fetching tickets.</div>
  }

  const ticketsPerUser: Ticket[] = await res.json()

  return (
    <div className="grid gap-4">
      <BackBtn url="/" />
      <TicketsTable tickets={ticketsPerUser} user={true} />
    </div>
  )
}
