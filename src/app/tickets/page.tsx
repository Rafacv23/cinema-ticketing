import BackBtn from "@/components/BackBtn"
import TicketsTable from "@/components/TicketsTable"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

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
    return <div>User not found. Please log in.</div>
  }

  const res = await fetch(`http://localhost:3000/api/tickets/${user.id}`)

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
