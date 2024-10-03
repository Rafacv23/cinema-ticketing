import BackBtn from "@/components/BackBtn"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate } from "@/lib/utils"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Ticket } from "@prisma/client"
import { CircleX } from "lucide-react"
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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header>
        <BackBtn url="/" />
        <Link
          href="/admin/create"
          className={buttonVariants({ variant: "default" })}
        >
          Add a new movie
        </Link>
      </header>
      <Table>
        <TableCaption>A list of all tickets.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order</TableHead>
            <TableHead>Movie</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Seats</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket: Ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium">{ticket.id}</TableCell>
              <TableCell>{ticket.movieId}</TableCell>
              <TableCell>{ticket.status}</TableCell>
              <TableCell>{ticket.seats.join(", ")}</TableCell>
              <TableCell>{formatDate(ticket.date)}</TableCell>
              <TableCell className="text-right">
                <Button variant={"destructive"}>
                  <CircleX />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
