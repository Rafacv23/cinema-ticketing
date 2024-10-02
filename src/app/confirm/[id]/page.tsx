import Celebration from "@/components/Celebration"
import { buttonVariants } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Link from "next/link"

export default async function Page({ params }: { params: { id: number } }) {
  const id = params.id

  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const res = await fetch(`http://localhost:3000/api/tickets/${user.id}/${id}`)
  const ticket = await res.json()

  console.log(ticket)

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start">
        <h1>Thanks for your reservation!</h1>
        <p>Order confirmed #{id}</p>
        <h2>Resume</h2>
        <ul>
          <li>Tickets for {ticket.movieId}</li>
          <li>Date: {formatDate(ticket.date)}</li>
          <li>Seats: {ticket.seats.join(", ")}</li>
        </ul>
        <p>Total price: $100.00</p>
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
    </div>
  )
}
