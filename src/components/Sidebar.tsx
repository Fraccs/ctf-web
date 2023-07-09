"use client"

import { useState } from "react"
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai"
import { RepoTreeNode } from "@/interfaces/repoTree"
import SidebarItem from "@/components/SidebarItem"

interface SidebarProps {
  repoTree: RepoTreeNode[]
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
    <aside className="flex flex-col w-96 text-white bg-zinc-900 border-r border-zinc-800">
      <article className="sticky bottom-0 flex items-center justify-end p-4 bg-zinc-900 border-b border-zinc-800">
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <AiOutlineMenuFold
            className="text-2xl hover:opacity-90"
          />
        </button>
      </article>
      <div className="flex flex-col gap-4 p-4 overflow-x-hidden overflow-y-scroll">
        {repoTree?.map((node, i) => {
          return (
            <SidebarItem
              key={i}
              path={node.path}
              sha={node.sha}
              sub={node.sub}
            />
          )
        })}
      </div>
    </aside>
  )
}
