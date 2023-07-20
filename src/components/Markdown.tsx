"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { twMerge } from "tailwind-merge"

type MarkdownProps = {
  className?: string
  markdown: string
}

export default function Markdown({ markdown, className }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "")

          return !inline && match ?
            <SyntaxHighlighter
              {...props}
              style={vscDarkPlus}
              language={match[1]}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter> :
            <code {...props} className={className}>
              {children}
            </code>
        }
      }}
      className={twMerge("prose prose-invert font-mono", className)}
    >
      {markdown}
    </ReactMarkdown>
  )
}
