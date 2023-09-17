"use client"

import { useState } from "react"
import { AiFillFlag } from "react-icons/ai"
import { GitHubRepoContent } from "@/types/github"
import { Button } from "@/components/ui/Button"

type FlagProps = Pick<GitHubRepoContent, "sha" | "path" | "content">

export default function Flag({ path, sha, content }: FlagProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <Button variant="outline" onClick={() => setIsVisible(!isVisible)}>
      <article className="max-w-full w-[32rem] flex items-center justify-center">
        <AiFillFlag className="text-xl text-red-600"/>
        <span className="mx-auto font-mono text-sm text-center">
          {isVisible ? (content ?? "Only admins can view flags!") : path}
        </span>
      </article>
    </Button>
  )
}
