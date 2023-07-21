"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { AiOutlineHome, AiOutlineRollback } from "react-icons/ai"
import { RepoTree, RepoTreeNode } from "@/types/repoTree"
import { getRepoTreeNodeBySha, getRepoTreeNodeParent } from "@/lib/github"

type PathNavProps = {
  repoTree: RepoTree
}

export default function PathNav({ repoTree }: PathNavProps) {
  const [segments, setSegments] = useState<string[]>([])
  const [parentNode, setParentNode] = useState<RepoTreeNode>(repoTree.root)

  const { sha } = useParams()

  useEffect(() => {
    const _parentNode = getRepoTreeNodeParent(repoTree, sha)
    const _currentNode = getRepoTreeNodeBySha(repoTree, sha)

    if(!_parentNode || !_currentNode) {
      setParentNode(repoTree.root)
      setSegments([])
      return
    }

    setSegments(_currentNode.path.split("/"))
    setParentNode(_parentNode)
  }, [sha])

  return (
    <div className="flex items-center bg-zinc-900 border-b border-zinc-800">
      <nav className="w-full">
        <ul className="flex items-center gap-2 px-4 font-mono font-semibold text-sm text-white">
          {segments.length === 0 ? <span className="text-zinc-600">/</span> : <></>}
          {segments.map((segment, i) => {
            return (
              <li key={i} className="flex items-center gap-2">
                <span>
                  <span className="text-zinc-600">/</span> {segment}
                </span>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-4 border-l border-zinc-800">
        <Link href={`/competitions/${parentNode?.sha}`} className="text-2xl text-white">
          {segments.length === 0 ? <AiOutlineHome/> : <AiOutlineRollback className="transition-colors hover:text-yellow-300 hover:opacity-90"/>}
        </Link>
      </div>
    </div>
  )
}
