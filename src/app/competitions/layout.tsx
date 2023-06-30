import { GithubGitTree } from "@/interfaces/github"
import githubService from "@/services/github"
import config from "@/utils/config"
import Sidebar from "@/components/Sidebar"

const getRepoTreeRecursive = async () => {
  const response = await githubService.apiRequest<GithubGitTree>({
    url: `/repos/${config.GITHUB_USER}/${config.GITHUB_TARGET_REPO}/git/trees/${config.GITHUB_TREE_SHA}?recursive=true`
  })

  return response.data.tree
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const repoTree = await getRepoTreeRecursive()

  return (
    <main className="h-full w-full flex">
      <Sidebar repoTree={repoTree}/>
      {children}
    </main>
  )
}
