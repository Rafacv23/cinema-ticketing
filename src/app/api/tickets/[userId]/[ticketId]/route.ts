import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { ticketId: string; userId: string } }
) {
  try {
    const ticketId = parseInt(params.ticketId)
    const userId = params.userId

    const ticketsPerUser = await prisma.ticket.findUnique({
      where: { id: ticketId, userId: userId },
    })

    if (!ticketsPerUser) {
      return new Response("No tickets found", { status: 404 })
    }

    return new Response(JSON.stringify(ticketsPerUser), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error(error)
    return new Response("Error retrieving tickets", { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
