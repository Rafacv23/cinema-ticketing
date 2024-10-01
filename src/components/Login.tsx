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
    // Send the user information to the registration endpoint
    const res = await fetch(
      `http://localhost:3000/api/auth/isRegister/${user}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user), // Send user data as JSON
      }
    )

    if (!res.ok) {
      console.error("Failed to register user:", await res.text())
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
