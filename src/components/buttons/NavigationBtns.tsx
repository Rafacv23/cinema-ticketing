"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export default function NavigationBtns() {
  const pathname = usePathname()

  return (
    <>
      <Link
        href="/"
        className={buttonVariants({
          variant: pathname === "/" ? "default" : "outline",
        })}
      >
        Now showing
      </Link>
      <Link
        href="/coming-soon"
        className={buttonVariants({
          variant: pathname === "/coming-soon" ? "default" : "outline",
        })}
      >
        Coming soon
      </Link>
    </>
  )
}
