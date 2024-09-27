import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import Login from "./Login"

export default function Header() {
  return (
    <header className="backdrop-blur-lg backdrop-opacity-60 bg-white/60 dark:bg-slate-900/60 flex justify-center space-x-4 items-center p-4 sticky top-0 z-40 w-full border-b border-b-slate-200 dark:border-b-slate-700">
      <div className="flex-grow flex justify-center space-x-4 items-center">
        <Link
          href={"/"}
          className={buttonVariants({
            variant: "default",
          })}
        >
          Now showing
        </Link>
        <Link
          href={"/coming-soon"}
          className={buttonVariants({
            variant: "default",
          })}
        >
          Coming soon
        </Link>
      </div>
      <Login />
    </header>
  )
}
