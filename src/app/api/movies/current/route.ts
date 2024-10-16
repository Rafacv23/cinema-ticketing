import { PrismaClient } from "@prisma/client"

export const revalidate = 60

export async function GET() {
  const prisma = new PrismaClient()

  try {
    const currentDate = new Date()
    const movies = await prisma.movie.findMany({
      where: { release: { lt: currentDate } },
      orderBy: { release: "desc" },
    })

    return new Response(JSON.stringify(movies), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } finally {
    await prisma.$disconnect()
  }
}
