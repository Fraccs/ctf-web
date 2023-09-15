"use client"

import { useState } from "react"
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai"
import { RepoTree } from "@/types/repoTree"
import SidebarItem from "@/components/SidebarItem"

type SidebarProps = {
  repoTree: RepoTree
}

export default function Sidebar({ repoTree }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  if(!isOpen) {
    return (
      <aside className="flex flex-col gap-2 border-r">
        <article className="sticky bottom-0 flex items-center justify-end p-4 border-b">
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
    <aside className="flex flex-col w-96 border-r">
      <article className="sticky bottom-0 flex items-center justify-end p-4 border-b">
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <AiOutlineMenuFold
            className="text-2xl hover:opacity-90"
          />
        </button>
      </article>
      <div className="flex flex-col gap-4 p-4 overflow-auto">
        {repoTree.root.sub?.map((node, i) => {
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
