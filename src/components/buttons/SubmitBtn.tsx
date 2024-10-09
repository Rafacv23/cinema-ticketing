import { buttonVariants } from "@/components/ui/button"

export default function SubmitBtn({
  isSubmitting,
  price,
}: {
  isSubmitting: boolean
  price: number
}) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={buttonVariants({
        variant: "default",
      })}
      aria-disabled={isSubmitting}
    >
      {isSubmitting ? "Reserving..." : `Reserve | ${price}$`}
    </button>
  )
}
