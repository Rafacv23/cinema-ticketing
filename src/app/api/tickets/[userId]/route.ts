import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId

    const ticketsPerUser = await prisma.ticket.findMany({
      where: { userId: userId },
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
