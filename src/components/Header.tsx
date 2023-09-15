import Link from "next/link"
import { AiOutlineGithub } from "react-icons/ai"
import env from "@/config/env"
import serverUseAuth from "@/hooks/serverUseAuth"
import ThemeToggle from "@/components/ThemeToggle"
import ProfileLoggedIn from "@/components/ProfileLoggedIn"
import ProfileLoggedOut from "@/components/ProfileLoggedOut"
import { Button } from "@/components/ui/Button"

export default function Header() {
  const auth = serverUseAuth()

  return (
    <header className="z-10 sticky top-0 flex items-center justify-between px-4 py-2 bg-background border-b">
      <Link href="/">
        <div className="flex items-center justify-center gap-4">
          <span className="text-xl font-mono">ctf-web</span>
        </div>
      </Link>
      <div className="flex items-center gap-2">
        <ThemeToggle/>
        <Button size="icon" variant="link">
          <Link href={`https://github.com/${env.GITHUB_USER}/${env.GITHUB_REPO}`} target="_blank">
            <AiOutlineGithub className="text-2xl hover:opacity-90"/>
          </Link>
        </Button>
        {auth ? <ProfileLoggedIn username={auth.username}/> : <ProfileLoggedOut/>}
      </div>
    </header>
  )
}
