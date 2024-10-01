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

interface Ticket {
  id: string
  status: string
  movieId: string
  seats: string[]
  date: Date
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
    <Table>
      <TableCaption>A list of your recent tickets.</TableCaption>
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
        {ticketsPerUser.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No tickets found.
            </TableCell>
          </TableRow>
        ) : (
          ticketsPerUser.map((ticket: Ticket) => (
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
          ))
        )}
      </TableBody>
    </Table>
  )
}
