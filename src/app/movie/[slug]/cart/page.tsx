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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start">
        <BackBtn url={`/movie/${params.slug}`} />
        <Reserve
          occupiedSeatsData={occupiedSeats}
          movieId={params.slug}
          userId={user.id}
        />
      </div>
    </div>
  )
}
