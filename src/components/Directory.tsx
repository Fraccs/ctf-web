import Link from "next/link"
import { AiFillFolder } from "react-icons/ai"
import { GitHubRepoContent } from "@/types/github"
import { isGithubRootFile } from "@/lib/github"
import { getGithubGitTree } from "@/utils/github"
import githubService from "@/services/github"
import env from "@/config/env"
import Flag from "@/components/Flag"
import Writeup from "@/components/Writeup"
import serverUseAuth from "@/hooks/serverUseAuth"

type DirectoryProps = {
  sha: string
}

export default async function Directory({ sha }: DirectoryProps) {
  const auth = serverUseAuth()

  const { tree } = await getGithubGitTree(sha)

  const isChallengeDirectory = tree.some(item => (
    item.type === "blob" && (!isGithubRootFile(item.path))
  ))

  const isChallengeSolved = tree.some(item => item.path === "flag.txt")

  if(isChallengeDirectory && !isChallengeSolved) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-zinc-950">
        <span className="text-lg text-gray-300 italic">This challenge hasn&apos;t been solved.</span>
      </div>
    )
  }

  if(isChallengeDirectory) {
    return (
      <div className="h-full grid grid-cols-1 gap-4 p-4 bg-zinc-950 text-white md:grid-cols-2">
        {tree.filter(item => item.type === "blob").map(async item => {
          if(item.path === "flag.txt") {
            let content = undefined

            if(auth?.permissions === "admin") {
              const response = await githubService.apiRequest<GitHubRepoContent>({
                url: `/repos/${env.GITHUB_USER}/${env.GITHUB_TARGET_REPO}/git/blobs/${item.sha}`
              })

              content = atob(response.data.content ?? "")
            }

            return (
              <Flag
                key={item.sha}
                path={item.path}
                sha={item.sha}
                content={content}
              />
            )
          }

          if(item.path === "writeup.md") {
            const response = await githubService.apiRequest<GitHubRepoContent>({
              url: `/repos/${env.GITHUB_USER}/${env.GITHUB_TARGET_REPO}/git/blobs/${item.sha}`
            })

            const markdown = atob(response.data.content ?? "")

            return (
              <Writeup
                key={item.sha}
                markdown={markdown}
              />
            )
          }
        })}
      </div>
    )
  }

  return (
    <div className="h-full w-full bg-zinc-950 text-white overflow-y-scroll">
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {tree.map(item => {
          if(item.type === "tree") {
            return (
              <Link key={item.sha} href={`/competitions/${item.sha}`}>
                <article className="h-full flex flex-col rounded-lg bg-zinc-900 p-4 border border-zinc-800 shadow-lg hover:bg-zinc-950">
                  <div className="flex items-center justify-center rounded-lg px-4 py-2 border border-zinc-800">
                    <AiFillFolder className="text-xl text-yellow-300"/>
                    <span className="mx-auto font-mono text-sm text-center">{item.path}</span>
                  </div>
                </article>
              </Link>
            )
          }
        })}
      </div>
    </div>
  )
}
