"use server"

import { formSchema } from "@/components/AddMovieForm"
import { z } from "zod"
import { PrismaClient } from "@prisma/client"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export const createMovie = async (values: z.infer<typeof formSchema>) => {
  try {
    const releaseDate = new Date(values.release).toISOString()
    const endDate = new Date(values.endDate).toISOString()

    const movie = await prisma.movie.create({
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

    console.log(`Movie created successfully:`, movie)
    revalidatePath("/admin/manage")
    revalidatePath("/coming-soon")
    redirect("/")
    return { success: true, message: "Movie created successfully" }
  } catch (error) {
    console.error("Error creating movie:", error)
    return { success: false, message: "Failed to create movie" }
  } finally {
    await prisma.$disconnect()
  }
}
