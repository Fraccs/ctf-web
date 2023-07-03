import Link from "next/link"
import { useState } from "react"
import { AiOutlineCaretRight } from "react-icons/ai"
import { RepoTreeNode } from "@/app/competitions/layout"

interface SidebarItemProps {
  path: string
  sha: string
  sub?: RepoTreeNode[]
}

export default function SidebarItem({ path, sha, sub }: SidebarItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <article className="flex flex-col justify-center gap-4">
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => setIsExpanded(!isExpanded)}>
          <AiOutlineCaretRight
            className={`text-white ${isExpanded ? "rotate-90 text-yellow-300" : ""} transition-transform`}
          />
        </button>
        <Link href={`/competitions/${sha}`} onClick={() => setIsExpanded(!isExpanded)}>
          <span className="whitespace-nowrap font-mono transition-colors hover:text-yellow-300">{path}</span>
        </Link>
      </div>
      {isExpanded ?
        <div className="flex flex-col gap-4 pl-2">
          {sub?.map((child: SidebarItemProps, i) => {
            return (
              <SidebarItem key={i} {...child}/>
            )
          })}
        </div> : <></>}
    </article>
  )
}
