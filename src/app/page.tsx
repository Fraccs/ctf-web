import Link from "next/link"
import { getGithubGitMainSha } from "@/utils/github"
import { AiFillFileMarkdown, AiFillFolder } from "react-icons/ai"

export default async function Page() {
  const sha = await getGithubGitMainSha()

  return (
    <main className="h-full flex flex-col items-center justify-center gap-16 bg-zinc-950">
      <span className="p-2 font-bold text-5xl text-center text-transparent italic bg-clip-text bg-gradient-to-r from-zinc-950 via-white to-zinc-950 animate-gradient-x">Collection of <span className="text-rose-600">CTF</span> solves and writeups</span>
      <div className="w-full flex items-center justify-center gap-16">
        <Link href="/readme" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br bg-white font-bold text-center shadow-2xl drop-shadow-2xl shadow-white hover:opacity-90">
          <AiFillFileMarkdown/>
          <span>README.md</span>
        </Link>
        <Link href={`/competitions/${sha}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-br from-red-600 via-rose-600 to-red-500 font-bold text-center text-white shadow-2xl drop-shadow-2xl shadow-rose-600 hover:opacity-90">
          <AiFillFolder/>
          <span>Competitions</span>
        </Link>
      </div>
    </main>
  )
}
