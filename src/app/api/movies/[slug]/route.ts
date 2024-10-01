import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Obtener el slug de los parámetros
    const slug = params.slug
    // Buscar la película por título
    const movie = await prisma.movie.findUnique({
      where: { slug: slug }, // Querying by title
    })

    if (!movie) {
      return new Response("Movie not found", { status: 404 })
    }

    // Retornar la película en formato JSON
    return new Response(JSON.stringify(movie), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error(error)
    return new Response("Error retrieving movie", { status: 500 })
  } finally {
    await prisma.$disconnect() // Asegúrate de desconectar el cliente Prisma
  }
}
