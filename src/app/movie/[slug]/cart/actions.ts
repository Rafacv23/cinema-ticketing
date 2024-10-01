"use server"

import { z } from "zod"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

const ticketSchema = z.object({
  movieId: z.string().min(1, "Movie ID is required"),
  userId: z.string().min(1, "User ID is required"),
  seats: z.array(z.string()).min(1, "At least one seat must be selected"),
})

export default async function createTicket(data: {
  movieId: string
  userId: string
  seats: string[]
}) {
  const parse = ticketSchema.safeParse(data)

  if (!parse.success) {
    return { message: "Failed to create ticket: Invalid data" }
  }

  const { movieId, userId, seats } = parse.data

  try {
    await prisma.ticket.create({
      data: {
        movieId,
        userId,
        seats,
        status: "confirmed",
        date: new Date(),
        time: new Date(),
      },
    })

    revalidatePath(`/movie/${movieId}/cart`)
    return {
      message: `Ticket created for movie ${movieId} and seats ${seats.join(
        ", "
      )}`,
    }
  } catch (error) {
    console.error("Error creating ticket:", error)
    return { message: "Failed to create ticket: Database error" }
  }
}
