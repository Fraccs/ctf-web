"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism"
import { twMerge } from "tailwind-merge"
import { useTheme } from "next-themes"

type MarkdownProps = {
  className?: string
  markdown: string
}

export default function Markdown({ markdown, className }: MarkdownProps) {
  const { theme } = useTheme()

  const darkThemeProse = "prose-invert"

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "")

          return !inline && match ?
            <SyntaxHighlighter
              {...props}
              style={theme === "dark" ? vscDarkPlus : vs}
              language={match[1]}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter> :
            <code {...props} className={className}>
              {children}
            </code>
        }
      }}
      className={twMerge(`${theme === "dark" ? darkThemeProse : ""} prose font-mono`, className)}
    >
      {markdown}
    </ReactMarkdown>
  )
}
