import { GITHUB_URL, LINKEDIN_URL } from "@/site/config"
import { Github, Heart, Linkedin } from "lucide-react"
import Link from "next/link"
export default function Footer() {
  return (
    <footer className="bg-white/60 dark:bg-slate-900/60 flex flex-col justify-center bottom-0 gap-4 items-center p-4 w-full border shadow-xl rounded-xl md:mt-4 border-b-slate-200 dark:border-b-slate-700">
      <div className="flex gap-2 flex-wrap">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin />
          Linkedin →
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
          Github →
        </Link>
      </div>
      <small className="flex items-center gap-2 text-sm">
        Created with <Heart /> by
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href={"www.rafacanosa.dev"}
          target="_blank"
        >
          Rafa Canosa.
        </Link>
      </small>
    </footer>
  )
}
