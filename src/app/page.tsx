import Link from "next/link"
import { AiFillFileMarkdown, AiFillFolder } from "react-icons/ai"
import { getGithubGitMainSha } from "@/utils/github"
import { Button, buttonVariants } from "@/components/ui/Button"
import { cn } from "@/utils/cn"
import { twMerge } from "tailwind-merge"

export default async function Page() {
  const sha = await getGithubGitMainSha()

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-16">
      <span className="font-bold text-5xl text-center">Collection of <span className="text-red-500">CTF</span> solves and writeups</span>
      <div className="w-full flex items-center justify-center gap-16">
        <Link href="/readme" className={twMerge(cn(buttonVariants({ variant: "outline" })), "flex items-center gap-2 font-bold text-center")}>
          <AiFillFileMarkdown/>
          <span>README.md</span>
        </Link>
        <Link href={`/competitions/${sha}`} className={twMerge(cn(buttonVariants({ variant: "secondary" })), "flex items-center gap-2 font-bold text-center")}>
          <AiFillFolder/>
          <span>Competitions</span>
        </Link>
      </div>
    </main>
  )
}
