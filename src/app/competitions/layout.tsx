import { PropsWithChildren } from "react"
import { getGithubGitMainSha, getGithubGitTree, githubGitTreeToRepoTree } from "@/utils/github"
import Sidebar from "@/components/Sidebar"

export default async function Layout({ children }: PropsWithChildren) {
  const gitTreeSha = await getGithubGitMainSha()
  const githubGitTree = await getGithubGitTree(gitTreeSha, true)

  const repoTree = githubGitTreeToRepoTree(githubGitTree)

  return (
    <main className="h-full w-full flex">
      <Sidebar repoTree={repoTree}/>
      {children}
    </main>
  )
}
