import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export default async function Login() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (user) {
    await fetch(`http://localhost:3000/api/auth/isRegister`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  return user ? (
    <LogoutLink>LogOut</LogoutLink>
  ) : (
    <>
      <LoginLink>Login</LoginLink> <RegisterLink>Register</RegisterLink>
    </>
  )
}
