import { GitHubRepoContent } from "@/types/github"
import githubService from "@/services/github"
import Markdown from "@/components/Markdown"
import env from "@/config/env"
import { AiFillFileMarkdown } from "react-icons/ai"

const getReadme = async () => {
  const response = await githubService.apiRequest<GitHubRepoContent>({
    url: `/repos/${env.GITHUB_USER}/${env.GITHUB_TARGET_REPO}/contents/README.md`
  })

  return response.data
}

export default async function Page() {
  const { content } = await getReadme()

  return (
    <main className="h-full flex flex-col items-center p-4 bg-zinc-950 overflow-y-scroll">
      <div className="h-full flex flex-col rounded-xl shadow-lg border border-zinc-700 overflow-hidden">
        <div className="flex items-center gap-4 p-4 bg-zinc-800">
          <AiFillFileMarkdown className="text-xl text-cyan-300"/>
          <span className="font-mono text-sm text-white">README.md</span>
        </div>
        <div className="p-8 bg-zinc-900 overflow-y-scroll">
          <Markdown markdown={atob(content || "")}/>
        </div>
      </div>
    </main>
  )
}
