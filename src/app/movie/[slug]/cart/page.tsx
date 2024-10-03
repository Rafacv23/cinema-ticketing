import BackBtn from "@/components/BackBtn"
import Reserve from "@/components/Reserve"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export default async function SeatForm({
  params,
}: {
  params: { slug: string }
}) {
  const res = await fetch(
    `http://localhost:3000/api/movies/${params.slug}/reservedSeats`
  )
  const occupiedSeats = await res.json()

  const { getUser } = getKindeServerSession()
  const user = await getUser()
  return (
    <div className="grid gap-4">
      <BackBtn url={`/movie/${params.slug}`} />
      <Reserve
        occupiedSeatsData={occupiedSeats}
        movieId={params.slug}
        userId={user.id}
      />
    </div>
  )
}
