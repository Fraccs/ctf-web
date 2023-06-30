"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { twMerge } from "tailwind-merge"

interface MarkdownProps {
  className?: string
  markdown: string
}

export default function Markdown({ markdown, className }: MarkdownProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} className={twMerge("prose prose-invert font-mono", className)}>
      {markdown}
    </ReactMarkdown>
  )
}
