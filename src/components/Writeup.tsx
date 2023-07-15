"use client"

import { AiFillFileMarkdown } from "react-icons/ai"
import Markdown from "@/components/Markdown"

type WriteupProps = {
  markdown: string
}

export default function Writeup({ markdown }: WriteupProps) {
  return (
    <div className="flex flex-col rounded-xl shadow-lg border border-zinc-700 overflow-hidden">
      <div className="flex items-center gap-4 p-4 bg-zinc-800">
        <AiFillFileMarkdown className="text-xl text-cyan-300"/>
        <span className="font-mono text-sm">writeup.md</span>
      </div>
      <div className="p-8 bg-zinc-900">
        <Markdown markdown={markdown}/>
      </div>
    </div>
  )
}
