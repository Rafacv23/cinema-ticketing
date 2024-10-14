import { buttonVariants } from "./ui/button"

export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <span className="relative inline-flex">
        <span className="animate-ping absolute inline-flex h-3 w-3 z-50 rounded-md bg-primary opacity-75"></span>
        <span className={buttonVariants({ variant: "outline" })}>Loading</span>
      </span>
    </div>
  )
}
