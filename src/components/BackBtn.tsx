import { Undo2 } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "./ui/button"

export default function BackBtn({ url }: { url: string }) {
  return (
    <Link
      href={url}
      className={buttonVariants({
        variant: "outline",
        className: "gap-2 flex items-center justify-center",
      })}
    >
      <Undo2 size={20} /> Back
    </Link>
  )
}
