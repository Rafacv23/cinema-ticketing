"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="backdrop-blur-lg backdrop-opacity-60 bg-white/60 dark:bg-slate-900/60 flex justify-center space-x-4 items-center p-4 sticky top-0 z-40 w-full border-b border-b-slate-200 dark:border-b-slate-700">
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
