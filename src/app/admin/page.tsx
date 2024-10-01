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
    <Table>
      <TableCaption>A list of all tickets.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order Number</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Movie</TableHead>
          <TableHead className="text-right">Seats</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket: Ticket) => (
          <TableRow key={ticket.id}>
            <TableCell className="font-medium">{ticket.id}</TableCell>
            <TableCell>{ticket.status}</TableCell>
            <TableCell>{ticket.movieId}</TableCell>
            <TableCell className="text-right">
              {ticket.seats.join(", ")}
            </TableCell>
            <TableCell className="text-right">
              {formatDate(ticket.date)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
