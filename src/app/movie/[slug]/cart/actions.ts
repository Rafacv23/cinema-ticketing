"use server"

import { z } from "zod"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

const ticketSchema = z.object({
  movieId: z.string().min(1, "Movie ID is required"),
  userId: z.string().min(1, "User ID is required"),
  seats: z.array(z.string()).min(1, "At least one seat must be selected"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  price: z.number().min(1, "Price is required"),
})

export default async function createTicket(data: {
  movieId: string
  userId: string
  seats: string[]
  date: string
  time: string
  price: number
}) {
  const parse = ticketSchema.safeParse(data)

  if (!parse.success) {
    return { message: "Failed to create ticket: Invalid data" }
  }

  const { movieId, userId, seats, date, time, price } = parse.data

  try {
    const ticket = await prisma.ticket.create({
      data: {
        movieId,
        userId,
        seats,
        status: "confirmed",
        date: new Date(date),
        time: time,
        price: price,
      },
    })

    revalidatePath(`/movie/${movieId}/cart`)
    revalidatePath(`/tickets`)
    return {
      message: `Ticket #${
        ticket.id
      } created for movie ${movieId} and seats ${seats.join(", ")}`,
      ticketId: ticket.id,
    }
  } catch (error) {
    console.error("Error creating ticket:", error)
    return { message: "Failed to create ticket: Database error" }
  }
}
