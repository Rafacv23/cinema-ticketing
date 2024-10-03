import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  getKindeServerSession,
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react"
import NavigationBtns from "@/components/NavigationBtns"

export default async function Header() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const isAdmin = user?.email === process.env.ADMIN_EMAIL
  const isAuthenticated = user !== null

  return (
    <header className="backdrop-blur-lg backdrop-opacity-60 bg-white/60 dark:bg-slate-900/60 flex justify-center space-x-4 items-center p-4 sticky top-0 z-40 w-full border shadow-xl rounded-xl md:mt-4 border-b-slate-200 dark:border-b-slate-700">
      <div className="flex-grow flex justify-center space-x-4 items-center">
        <NavigationBtns />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isAuthenticated ? (
            <DropdownMenuItem>
              <Link
                href={"/tickets"}
                className={buttonVariants({
                  variant: "default",
                  className: "w-full",
                })}
              >
                Tickets
              </Link>
            </DropdownMenuItem>
          ) : null}
          {isAdmin ? (
            <DropdownMenuItem>
              <Link
                href={"/admin"}
                className={buttonVariants({
                  variant: "default",
                  className: "w-full",
                })}
              >
                Admin
              </Link>
            </DropdownMenuItem>
          ) : null}
          {user ? (
            <DropdownMenuItem>
              <LogoutLink
                className={buttonVariants({
                  variant: "outline",
                  className: "w-full",
                })}
              >
                LogOut
              </LogoutLink>
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem>
                <LoginLink
                  className={buttonVariants({
                    variant: "outline",
                    className: "w-full",
                  })}
                >
                  Login
                </LoginLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RegisterLink
                  className={buttonVariants({
                    variant: "outline",
                    className: "w-full",
                  })}
                >
                  Register
                </RegisterLink>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
