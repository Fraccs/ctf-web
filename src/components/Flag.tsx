"use client"

import { useState } from "react"
import { AiFillFlag, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { GitHubRepoContent } from "@/types/github"

type FlagProps = Pick<GitHubRepoContent, "sha" | "path" | "content">

export default function Flag({ path, sha, content }: FlagProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <article key={sha} className="h-min flex flex-col rounded-lg bg-zinc-900 p-4 border border-zinc-800 shadow-lg">
      <div className="flex items-center justify-center rounded-lg px-4 py-2 border border-zinc-800">
        <AiFillFlag className="text-xl text-red-600"/>
        <span className="mx-auto font-mono text-sm text-center">
          {isVisible ? (content ?? "Only admins can view flags!") : path}
        </span>
        {isVisible ?
          <button type="button" onClick={() => setIsVisible(false)}>
            <AiOutlineEye className="text-xl hover:opacity-90"/>
          </button> :
          <button type="button" onClick={() => setIsVisible(true)}>
            <AiOutlineEyeInvisible className="text-xl hover:opacity-90"/>
          </button>}
      </div>
    </article>
  )
}
