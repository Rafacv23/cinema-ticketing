"use client"

import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { Calendar, Film } from "lucide-react"

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
        <Film className="w-4 h-4 mr-2" />
        Now showing
      </Link>
      <Link
        href="/coming-soon"
        className={buttonVariants({
          variant: pathname === "/coming-soon" ? "default" : "outline",
        })}
      >
        <Calendar className="w-4 h-4 mr-2" />
        Coming soon
      </Link>
    </>
  )
}
