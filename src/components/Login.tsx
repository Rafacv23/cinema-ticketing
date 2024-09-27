import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { PrismaClient } from "@prisma/client"

export default async function Login() {
  const prisma = new PrismaClient()
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (user) {
    const existingUser = await prisma.user.findUnique({
      where: { kindeId: user.id },
    })
    if (!existingUser) {
      // Si no existe, creamos un nuevo usuario
      const newUser = await prisma.user.create({
        data: {
          kindeId: user.id,
          email: user.email,
          name: `${user.given_name} ${user.family_name}`,
        },
      })
      console.log("Nuevo usuario creado:", newUser)
    } else {
      console.log("Usuario ya existe:", existingUser)
    }
  }

  return user ? (
    <LogoutLink>LogOut</LogoutLink>
  ) : (
    <>
      <LoginLink>Login</LoginLink> <RegisterLink>Register</RegisterLink>
    </>
  )
}
