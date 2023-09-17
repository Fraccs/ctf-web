import { GithubGitBlob } from "@/types/github"
import githubService from "@/services/github"
import Markdown from "@/components/Markdown"
import env from "@/config/env"

const getReadme = async () => {
  const response = await githubService.apiRequest<GithubGitBlob>({
    url: `/repos/${env.GITHUB_USER}/${env.GITHUB_TARGET_REPO}/contents/README.md`
  })

  return response.data
}

export default async function Page() {
  const { content } = await getReadme()

  return (
    <main className="flex flex-col items-center p-4">
      <Markdown markdown={atob(content || "")}/>
    </main>
  )
}
