import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const revalidate = 60

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug

    const ticketsPerMovie = await prisma.ticket.findMany({
      where: { movieId: slug },
      select: {
        seats: true,
        date: true,
        time: true,
        status: true, // Additional field for status
        movie: {
          select: {
            title: true, // Retrieve movie title
            price: true, // Retrieve movie price
          },
        },
      },
    })

    if (!ticketsPerMovie || ticketsPerMovie.length === 0) {
      return new Response("No tickets found", { status: 404 })
    }

    const responseData = ticketsPerMovie.map((ticket) => ({
      seats: ticket.seats,
      date: ticket.date,
      time: ticket.time,
      status: ticket.status, // Include the status
      movieTitle: ticket.movie?.title, // Include movie title
      moviePrice: ticket.movie?.price, // Include movie price
    }))

    return new Response(JSON.stringify(responseData), {
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
