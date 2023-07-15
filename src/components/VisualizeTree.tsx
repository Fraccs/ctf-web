import Link from "next/link"
import { AiFillFileMarkdown, AiFillFolder } from "react-icons/ai"
import { GitHubRepoContent } from "@/types/github"
import { getGithubGitTree, isGithubRootFile } from "@/utils/github"
import Flag from "@/components/Flag"
import Markdown from "@/components/Markdown"
import githubService from "@/services/github"
import env from "@/config/env"

type VisualizeTreeProps = {
  sha: string
}

export default async function VisualizeTree({ sha }: VisualizeTreeProps) {
  const { tree } = await getGithubGitTree(sha)

  const isChallengeDirectory = tree.some(node => (
    node.type === "blob" && (!isGithubRootFile(node.path))
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
      <div className="h-full w-full bg-zinc-950 text-white overflow-y-scroll">
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
          {tree.map(async item => {
            if(item.type === "tree") {
              return <></>
            }

            if(item.path === "flag.txt") {
              return (
                <Flag
                  key={item.sha}
                  path={item.path}
                  sha={item.sha}
                />
              )
            }

            if(item.path === "writeup.md") {
              const response = await githubService.apiRequest<GitHubRepoContent>({
                url: `/repos/${env.GITHUB_USER}/${env.GITHUB_TARGET_REPO}/git/blobs/${item.sha}`
              })

              const markdown = atob(response.data.content ?? "")

              return (
                <div key={item.sha} className="flex flex-col rounded-xl shadow-lg border border-zinc-700 overflow-hidden">
                  <div className="flex items-center gap-4 p-4 bg-zinc-800">
                    <AiFillFileMarkdown className="text-xl text-cyan-300"/>
                    <span className="font-mono text-sm">writeup.md</span>
                  </div>
                  <div className="p-8 bg-zinc-900">
                    <Markdown markdown={markdown}/>
                  </div>
                </div>
              )
            }
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full bg-zinc-950 text-white overflow-y-scroll">
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {tree.map(async item => {
          if(item.type === "tree") {
            return (
              <Link key={item.sha} href={`/competitions/${item.sha}`}>
                <article className="h-full flex flex-col rounded-lg bg-zinc-900 p-4 border border-zinc-800 shadow-lg">
                  <div className="flex items-center justify-center rounded-lg px-4 py-2 border border-zinc-800">
                    <AiFillFolder className="text-xl text-yellow-300"/>
                    <span className="mx-auto font-bold text-sm text-center">{item.path}</span>
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
