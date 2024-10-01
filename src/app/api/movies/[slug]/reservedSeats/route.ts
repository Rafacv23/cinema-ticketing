import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug

    const ticketsPerMovie = await prisma.ticket.findMany({
      where: { movieId: slug },
      select: { seats: true },
    })

    if (!ticketsPerMovie) {
      return new Response("No tickets found", { status: 404 })
    }

    const occupiedSeats = ticketsPerMovie.flatMap((ticket) => ticket.seats)

    return new Response(JSON.stringify(occupiedSeats), {
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
