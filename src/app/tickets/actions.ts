"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export const deleteTicket = async (ticketId: number) => {
  if (!ticketId) {
    console.error("No ticket id provided.")
    return { success: false, message: "No ticket ID provided" }
  }

  try {
    // Deleting the ticket from the database
    await prisma.ticket.delete({
      where: {
        id: ticketId,
      },
    })
    console.log(`Ticket with id ${ticketId} deleted.`)
    revalidatePath("/tickets")
    return { success: true, message: "Ticket deleted successfully" }
  } catch (error) {
    console.error(`Error deleting ticket with id ${ticketId}:`, error)
    return { success: false, message: "Failed to delete ticket" }
  } finally {
    await prisma.$disconnect()
  }
}
