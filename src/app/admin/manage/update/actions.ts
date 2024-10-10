"use server"

import { formSchema } from "@/components/forms/AddMovieForm" // Ensure correct import path
import { z } from "zod"
import { PrismaClient } from "@prisma/client"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

// Update function to modify an existing movie
export const updateMovie = async (
  slug: string,
  values: z.infer<typeof formSchema>
) => {
  try {
    // Convert release and end date strings to ISO format
    const releaseDate = new Date(values.release).toISOString()
    const endDate = new Date(values.endDate).toISOString()

    // Update the movie record in the database
    const movie = await prisma.movie.update({
      where: { slug }, // Find the movie by slug
      data: {
        title: values.title,
        slug: values.title.toLowerCase().replaceAll(" ", "-"),
        description: values.description,
        poster: values.poster,
        trailer: values.trailer,
        genres: values.genres,
        duration: values.duration,
        release: releaseDate,
        director: values.director,
        cast: values.cast,
        price: values.price,
        endDate: endDate,
      },
    })

    console.log(`Movie updated successfully:`, movie)

    // Revalidate paths to ensure the latest data is fetched
    revalidatePath("/admin/manage")
    revalidatePath("/coming-soon")

    // Redirect to a desired route after updating
    redirect("/admin/manage")
    return { success: true, message: "Movie updated successfully" }
  } catch (error) {
    console.error("Error updating movie:", error)
    return { success: false, message: "Failed to update movie" }
  } finally {
    await prisma.$disconnect() // Disconnect the Prisma client
  }
}
