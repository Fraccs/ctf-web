"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function Readme() {
  const [readme, setReadme] = useState("")

  useEffect(() => {
    const fetchReadme = async () => {
      const response = await axios.get("/api/readme")
      const readme = await response.data

      setReadme(atob(readme))
    }

    fetchReadme()
  }, [])

  return (
    <main className="h-full flex flex-col gap-4 p-8 bg-zinc-950 overflow-y-scroll">
      <span className="px-4 font-mono text-white">README.md</span>
      <div className="rounded-2xl p-8 border border-zinc-800">
        <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-invert font-mono">
          {readme}
        </ReactMarkdown>
      </div>
    </main>
  )
}
