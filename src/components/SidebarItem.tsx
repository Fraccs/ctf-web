"use client"

import Link from "next/link"
import { useState } from "react"
import { AiOutlineCaretRight, AiOutlineFlag } from "react-icons/ai"
import { RepoTreeNode } from "@/interfaces/repoTree"

interface SidebarItemProps {
  path: string
  sha: string
  sub?: RepoTreeNode[]
}

export default function SidebarItem({ path, sha, sub }: SidebarItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getCurrentPath = (path: string): string => {
    if(!path.includes("/")) {
      return path
    }

    const parts = path.split("/")

    return parts[parts.length - 1]
  }

  return (
    <article className="flex flex-col justify-center gap-4">
      <div className="flex items-center gap-4">
        {sub?.length ? <button type="button" onClick={() => setIsExpanded(!isExpanded)}>
          <AiOutlineCaretRight
            className={`${isExpanded ? "rotate-90 text-yellow-300" : ""} transition-transform`}
          />
        </button> : <AiOutlineFlag className="text-cyan-300"/>}
        <Link href={`/competitions/${sha}`}>
          <span className="whitespace-nowrap font-mono transition-colors hover:text-yellow-300">{getCurrentPath(path)}</span>
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
