import { PropsWithChildren } from "react"
import { githubGitTreeToRepoTree } from "@/lib/github"
import { getGithubGitMainSha, getGithubGitTree } from "@/utils/github"
import PathNav from "@/components/PathNav"
import Sidebar from "@/components/Sidebar"

export default async function Layout({ children }: PropsWithChildren) {
  const gitTreeSha = await getGithubGitMainSha()
  const githubGitTree = await getGithubGitTree(gitTreeSha, true)

  const repoTree = githubGitTreeToRepoTree(githubGitTree)

  return (
    <div className="h-full w-full flex">
      <Sidebar repoTree={repoTree}/>
      <div className="h-full w-full flex flex-col">
        <PathNav repoTree={repoTree}/>
        {children}
      </div>
    </div>
  )
}
