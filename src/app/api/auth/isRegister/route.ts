import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (user) {
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
    })

    if (!existingUser) {
      // If not exists, create a new user
      const newUser = await prisma.user.create({
        data: {
          id: user.id,
          email: user.email || user.id,
          name: `${user.given_name} ${user.family_name}`,
        },
      })
      console.log("Nuevo usuario creado:", newUser)
      return new Response(JSON.stringify(newUser), { status: 201 }) // Created
    } else {
      console.log("Usuario ya existe:", existingUser)
      return new Response(JSON.stringify(existingUser), { status: 200 }) // OK
    }
  }

  return new Response("No user found", { status: 404 }) // Not found
}
