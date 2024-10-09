"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createMovie } from "@/app/admin/manage/create/actions"

export const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  poster: z.string().url(),
  trailer: z.string(),
  genres: z.array(z.string()).min(1, {
    message: "At least one genre must be provided.",
  }),
  duration: z
    .number()
    .min(1, { message: "Duration must be at least 1 minute." }),
  release: z.string(),
  director: z.string(),
  cast: z.array(z.string()).min(1, {
    message: "At least one cast member must be provided.",
  }),
  price: z.number().min(1, { message: "Price must be at least 1 dollar." }),
  endDate: z.string(),
})

// 2. Define a submit handler.
function onSubmit(values: z.infer<typeof formSchema>) {
  createMovie(values)
}

export default function AddMovieForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      genres: [""], // Start with an empty genre
      cast: [""], // Start with an empty cast
      price: 6.99,
      release: new Date().toISOString().split("T")[0],
    },
  })

  // UseFieldArray for genres
  const {
    fields: genreFields,
    append: addGenre,
    remove: removeGenre,
  } = useFieldArray({
    control: form.control,
    name: "genres", // Explicitly tell TypeScript this field corresponds to genres
  })

  // UseFieldArray for cast
  const {
    fields: castFields,
    append: addCast,
    remove: removeCast,
  } = useFieldArray({
    control: form.control,
    name: "cast", // Explicitly tell TypeScript this field corresponds to cast
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormDescription>Title of the movie.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe" {...field} />
              </FormControl>
              <FormDescription>Description of the movie.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="poster"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poster</FormLabel>
              <FormControl>
                <Input placeholder="Poster" {...field} />
              </FormControl>
              <FormDescription>Poster url for the movie.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="trailer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trailer</FormLabel>
              <FormControl>
                <Input placeholder="Trailer" {...field} />
              </FormControl>
              <FormDescription>Trailer url for the movie.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="director"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Director</FormLabel>
              <FormControl>
                <Input placeholder="Directed by" {...field} />
              </FormControl>
              <FormDescription>Director of the movie.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Genres array field */}
        <FormItem>
          <FormLabel>Genres</FormLabel>
          {genreFields.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2">
              <FormControl>
                <Input
                  placeholder="Genre"
                  {...form.register(`genres.${index}`)} // Register each input in the array
                />
              </FormControl>
              <Button
                type="button"
                onClick={() => removeGenre(index)}
                variant="destructive"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => addGenre("")}>
            Add Genre
          </Button>
        </FormItem>

        {/* Cast array field */}
        <FormItem>
          <FormLabel>Cast</FormLabel>
          {castFields.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2">
              <FormControl>
                <Input
                  placeholder="Cast Member"
                  {...form.register(`cast.${index}`)}
                />
              </FormControl>
              <Button
                type="button"
                onClick={() => removeCast(index)}
                variant="destructive"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => addCast("")}>
            Add Cast Member
          </Button>
        </FormItem>
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input
                  placeholder="Duration"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>
                Duration in minutes of the movie.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Price"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>
                Price per ticket of the movie. In dollars.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="release"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release Date</FormLabel>
              <FormControl>
                <Input placeholder="Releases in" type="date" {...field} />
              </FormControl>
              <FormDescription>Release date of the movie.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input placeholder="Ends in" type="date" {...field} />
              </FormControl>
              <FormDescription>End date of the movie.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="reset" variant={"outline"}>
          Reset
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
