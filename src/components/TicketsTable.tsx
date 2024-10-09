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
import DeleteTicket from "@/components/alerts/DeleteTicketAlert"
import { Ticket } from "@/app/tickets/page"

interface TicketsTableProps {
  tickets: Ticket[]
  user: boolean
}

export default function TicketsTable({ tickets, user }: TicketsTableProps) {
  return (
    <Table>
      <TableCaption>
        {user ? "A list of your recent tickets." : "A list of all tickets."}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order Number</TableHead>
          <TableHead>Movie</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Seats</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Reserved Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No tickets found.
            </TableCell>
          </TableRow>
        ) : (
          tickets.map((ticket: Ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium">{ticket.id}</TableCell>
              <TableCell>{ticket.movieId}</TableCell>
              <TableCell>{ticket.status}</TableCell>
              <TableCell>{ticket.seats.join(", ")}</TableCell>
              <TableCell>{ticket.price}$</TableCell>
              <TableCell>{formatDate(ticket.date)}</TableCell>
              <TableCell>{ticket.time}</TableCell>
              <TableCell>{formatDate(ticket.createdAt)}</TableCell>
              {user ? (
                <TableCell className="text-right">
                  <DeleteTicket
                    ticketId={parseInt(ticket.id)}
                    ticketDate={ticket.date}
                  />
                </TableCell>
              ) : null}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
