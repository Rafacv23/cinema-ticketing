import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany()

    if (!tickets) {
      return new Response("No tickets found", { status: 404 })
    }

    return new Response(JSON.stringify(tickets), {
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
