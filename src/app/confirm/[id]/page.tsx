import Celebration from "@/components/Celebration"
import { buttonVariants } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { SITE_URL } from "@/site/config"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Link from "next/link"

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id

  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const res = await fetch(`${SITE_URL}/api/tickets/${user.id}/${id}`)
  const ticket = await res.json()

  return (
    <div className="grid gap-4">
      <h1>Thanks for your reservation!</h1>
      <p>Order confirmed #{id}</p>
      <h2>Resume</h2>
      <ul>
        <li>Tickets for {ticket.movieId}</li>
        <li>Date: {formatDate(ticket.date)}</li>
        <li>Time: {ticket.time}</li>
        <li>Seats: {ticket.seats.join(", ")}</li>
      </ul>
      <p>Total price: ${ticket.price}</p>
      <footer className="flex gap-8">
        <Link
          href={"/"}
          className={buttonVariants({
            variant: "default",
          })}
        >
          Back to home
        </Link>
        <Link
          href={"/tickets"}
          className={buttonVariants({
            variant: "default",
          })}
        >
          See all your tickets
        </Link>
      </footer>
      <Celebration />
    </div>
  )
}
