import Link from "next/link"
import { AiFillFileMarkdown, AiFillFolder } from "react-icons/ai"
import { getGithubGitMainSha } from "@/utils/github"
import { Button } from "@/components/ui/Button"

export default async function Page() {
  const sha = await getGithubGitMainSha()

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-16">
      <span className="font-bold text-5xl text-center">Collection of <span className="text-red-500">CTF</span> solves and writeups</span>
      <div className="w-full flex items-center justify-center gap-16">
        <Button variant="outline">
          <Link href="/readme" className="flex items-center gap-2 font-bold text-center">
            <AiFillFileMarkdown/>
            <span>README.md</span>
          </Link>
        </Button>
        <Button variant="secondary">
          <Link href={`/competitions/${sha}`} className="flex items-center gap-2 font-bold text-center">
            <AiFillFolder/>
            <span>Competitions</span>
          </Link>
        </Button>
      </div>
    </main>
  )
}
