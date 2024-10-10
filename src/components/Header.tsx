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
import {
  Ellipsis,
  LogIn,
  LogOut,
  ShieldCheck,
  Ticket,
  UserPlus,
} from "lucide-react"
import NavigationBtns from "@/components/buttons/NavigationBtns"

export default async function Header() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const isAdmin = user?.email === process.env.ADMIN_EMAIL
  const isAuthenticated = user !== null

  return (
    <header className="backdrop-blur-lg backdrop-opacity-60 bg-card flex justify-center space-x-4 items-center p-4 sticky top-0 z-40 w-full border rounded-xl md:mt-4">
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
                href="/tickets"
                className={buttonVariants({
                  variant: "ghost",
                  className: "w-full justify-start",
                })}
              >
                <Ticket className="mr-2 h-4 w-4" /> Tickets
              </Link>
            </DropdownMenuItem>
          ) : null}
          {isAdmin ? (
            <DropdownMenuItem>
              <Link
                href="/admin"
                className={buttonVariants({
                  variant: "ghost",
                  className: "w-full justify-start",
                })}
              >
                <ShieldCheck className="mr-2 h-4 w-4" /> Admin
              </Link>
            </DropdownMenuItem>
          ) : null}
          {user ? (
            <DropdownMenuItem>
              <LogoutLink
                className={buttonVariants({
                  variant: "destructive",
                  className: "w-full justify-start",
                })}
              >
                <LogOut className="mr-2 h-4 w-4" /> Log Out
              </LogoutLink>
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <LoginLink
                  className={buttonVariants({
                    variant: "ghost",
                    className: "w-full justify-start cursor-pointer",
                  })}
                >
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </LoginLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <RegisterLink
                  className={buttonVariants({
                    variant: "ghost",
                    className: "w-full justify-start cursor-pointer",
                  })}
                >
                  <UserPlus className="mr-2 h-4 w-4" /> Register
                </RegisterLink>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
