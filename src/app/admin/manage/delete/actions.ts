"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()
export const deleteMovie = async (movieSlug: string) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: { slug: movieSlug },
    })

    if (!movie) {
      return { success: false, message: "Movie doesnt exists" }
    }

    await prisma.movie.delete({
      where: { slug: movieSlug },
    })

    await prisma.ticket.deleteMany({
      where: { movieId: movieSlug },
    })

    revalidatePath("/admin/manage/delete")

    return { success: true, message: "Movie deleted successfully" }
  } catch (error) {
    console.error("Error deleting movie:", error)
    return { success: false, message: "Failed to delete movie" }
  } finally {
    await prisma.$disconnect()
  }
}
