import MoviesList from "@/components/MoviesList"
import { SITE_URL } from "@/site/config"

export default async function Page() {
  try {
    const response = await fetch(`${SITE_URL}/api/movies/soon`)

    // Check if the response is ok (status code in the range 200-299)
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`)
    }

    const movies = await response.json()

    return <MoviesList inTheaters={false} movies={movies} />
  } catch (error) {
    console.error("Error fetching movies:", error)
    return <div>Error loading movies. Please try again later.</div> // Optionally render an error message
  }
}
