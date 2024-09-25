"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="flex justify-center space-x-4 items-center p-4">
      <div className="flex-grow flex justify-center space-x-4 items-center">
        <Link
          href={"/"}
          className={buttonVariants({
            variant: pathname === "/" ? "default" : "outline",
          })}
        >
          Now showing
        </Link>
        <Link
          href={"/coming-soon"}
          className={buttonVariants({
            variant: pathname === "/coming-soon" ? "default" : "outline",
          })}
        >
          Coming soon
        </Link>
      </div>
      <Link
        href={"/login"}
        className={buttonVariants({
          variant: pathname === "/login" ? "default" : "outline",
        })}
      >
        Login
      </Link>
    </header>
  )
}
