import Image from "next/image"
import Link from "next/link"
import { AiOutlineGithub, AiOutlineUser } from "react-icons/ai"
import config from "@/utils/config"
import flagImg from "../assets/images/triangular-flag.png"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-zinc-900 border-b border-zinc-800">
      <div className="flex items-center justify-center gap-4">
        <span className="text-2xl font-mono text-white">ctf-web</span>
        <Image
          src={flagImg}
          height={32}
          width={32}
          alt="flag"
        />
      </div>
      <div className="flex items-center gap-8 px-4 py-2 rounded-lg border border-zinc-800">
        <Link href={`https://github.com/${config.GITHUB_USER}/${config.GITHUB_REPO}`} target="_blank">
          <AiOutlineGithub className="text-2xl text-white hover:opacity-90"/>
        </Link>
        <AiOutlineUser className="text-2xl text-white"/>
      </div>
    </header>
  )
}
