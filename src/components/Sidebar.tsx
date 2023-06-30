"use client"

import { useState } from "react"
import { AiOutlineEnter, AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai"
import { GithubGitTreeItem } from "@/interfaces/github"

interface SidebarProps {
  repoTree: GithubGitTreeItem[]
}

export default function Sidebar({ repoTree }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  if(!isOpen) {
    return (
      <aside className="flex flex-col gap-2 text-white bg-zinc-900 border-r border-zinc-800">
        <article className="sticky bottom-0 flex items-center justify-end p-4 bg-zinc-900 border-b border-zinc-800">
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            <AiOutlineMenuUnfold
              className="text-2xl hover:opacity-90"
            />
          </button>
        </article>
      </aside>
    )
  }

  return (
    <aside className="flex flex-col gap-2 w-72 text-white bg-zinc-900 border-r border-zinc-800">
      <article className="sticky bottom-0 flex items-center justify-end p-4 bg-zinc-900 border-b border-zinc-800">
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <AiOutlineMenuFold
            className="text-2xl hover:opacity-90"
          />
        </button>
      </article>
      <div className="flex flex-col gap-4 p-4 overflow-x-hidden overflow-y-scroll">
        {repoTree?.filter(item => item.type === "tree").map(item => {
          return (
            <article key={item.sha}>
              <span className="flex items-center gap-4">
                <AiOutlineEnter
                  style={{ transform: "scale(-1, 1)" }}
                />
                {item.path}
              </span>
            </article>
          )
        })}
      </div>
    </aside>
  )
}
