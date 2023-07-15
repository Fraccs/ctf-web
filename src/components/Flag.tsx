"use client"

import { AiFillFlag } from "react-icons/ai"
import { GitHubRepoContent } from "@/types/github"

type FlagProps = Pick<GitHubRepoContent, "sha" | "path">

export default function Flag({ path, sha }: FlagProps) {
  return (
    <article key={sha} className="h-min flex flex-col rounded-lg bg-zinc-900 p-4 border border-zinc-800 shadow-lg">
      <div className="flex items-center justify-center rounded-lg px-4 py-2 border border-zinc-800">
        <AiFillFlag className="text-xl text-red-600"/>
        <span className="mx-auto font-mono text-sm text-center">{path}</span>
      </div>
    </article>
  )
}
