"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import CartBtn from "@/components/buttons/CartBtn"

export default function StickyBuyBtn({
  movieTitle,
  movieSlug,
  isLogged,
}: {
  movieTitle: string
  movieSlug: string
  isLogged: boolean
}) {
  const [isSticky, setIsSticky] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, []) // Empty dependency array to run effect once on mount

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 p-4 bg-black bg-opacity-75 backdrop-blur-md transition-all duration-300 ${
        !isSticky ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <h2 className="text-xl font-semibold">{movieTitle}</h2>
        {isLogged ? (
          <Link
            href={`/movie/${movieSlug}/cart`}
            className={buttonVariants({ variant: "default" })}
          >
            Buy tickets
          </Link>
        ) : (
          <CartBtn />
        )}
      </div>
    </div>
  )
}
