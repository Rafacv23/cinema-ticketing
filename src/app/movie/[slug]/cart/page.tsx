import BackBtn from "@/components/buttons/BackBtn"
import Reserve from "@/components/Reserve"
import { SITE_URL } from "@/site/config"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export default async function SeatForm({
  params,
}: {
  params: { slug: string }
}) {
  const res = await fetch(`${SITE_URL}/api/movies/${params.slug}/reservedSeats`)
  const occupiedSeats = await res.json()

  const moviePrice = 10
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  return (
    <div className="grid gap-4">
      <BackBtn url={`/movie/${params.slug}`} />
      <Reserve
        moviePrice={moviePrice}
        occupiedSeatsData={occupiedSeats}
        movieId={params.slug}
        userId={user.id}
      />
    </div>
  )
}
