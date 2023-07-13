import { GitHubRepoContent } from "@/types/github"
import githubService from "@/services/github"
import Markdown from "@/components/Markdown"
import env from "@/config/env"

const getReadme = async () => {
  const response = await githubService.apiRequest<GitHubRepoContent>({
    url: `/repos/${env.GITHUB_USER}/${env.GITHUB_TARGET_REPO}/contents/README.md`
  })

  return response.data
}

export default async function Page() {
  const { content } = await getReadme()

  return (
    <main className="h-full flex flex-col gap-4 p-8 bg-zinc-950 overflow-y-scroll">
      <span className="px-4 font-mono text-white">README.md</span>
      <div className="rounded-2xl p-8 border border-zinc-800">
        <Markdown markdown={atob(content || "")}/>
      </div>
    </main>
  )
}
