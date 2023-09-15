import Link from "next/link"
import { AiOutlineGithub, AiOutlineLogin, AiOutlineUser } from "react-icons/ai"
import env from "@/config/env"
import serverUseAuth from "@/hooks/serverUseAuth"
import ThemeToggle from "@/components/ThemeToggle"

export default function Header() {
  const auth = serverUseAuth()

  return (
    <header className="z-10 sticky top-0 flex items-center justify-between px-8 py-4 bg-background border-b">
      <Link href="/">
        <div className="flex items-center justify-center gap-4">
          <span className="text-2xl font-mono">ctf-web</span>
        </div>
      </Link>
      <div className="flex items-center gap-4">
        <ThemeToggle/>
        <Link href={`https://github.com/${env.GITHUB_USER}/${env.GITHUB_REPO}`} target="_blank">
          <AiOutlineGithub className="text-2xl hover:opacity-90"/>
        </Link>
        {auth ?
          <AiOutlineUser title={`You are logged in as ${auth.username}`} className="text-2xl hover:opacity-90"/> :
          <Link href="/login">
            <AiOutlineLogin className="text-2xl hover:opacity-90"/>
          </Link>}
      </div>
    </header>
  )
}
