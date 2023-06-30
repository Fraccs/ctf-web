import Link from "next/link"
import { AiFillFolder, AiFillFlag } from "react-icons/ai"
import { GitHubRepoContent, GithubGitTree } from "@/interfaces/github"
import githubService from "@/services/github"
import config from "@/utils/config"
import Markdown from "./Markdown"

interface VisualizeTreeProps {
  sha?: string
}

const getRepoTree = async (sha?: string, recursive?: boolean) => {
  const response = await githubService.apiRequest<GithubGitTree>({
    url: `/repos/${config.GITHUB_USER}/${config.GITHUB_TARGET_REPO}/git/trees/${sha || config.GITHUB_TREE_SHA}${recursive ? "?recursive=true" : ""}`
  })

  return response.data.tree
}

export default async function VisualizeTree({ sha }: VisualizeTreeProps) {
  const tree = await getRepoTree(sha)

  return (
    <main className="h-full bg-zinc-950 text-white overflow-y-scroll">
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {tree?.map(async item => {
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

          if(item.path === "flag.txt") {
            return (
              <article key={item.sha} className="h-full flex flex-col rounded-lg bg-zinc-900 p-4 border border-zinc-800 shadow-lg">
                <div className="flex items-center justify-center rounded-lg px-4 py-2 border border-zinc-800">
                  <AiFillFlag className="text-xl text-red-600"/>
                  <span className="mx-auto font-bold text-sm text-center">{item.path}</span>
                </div>
              </article>
            )
          }

          if(item.path === "writeup.md") {
            const response = await githubService.apiRequest<GitHubRepoContent>({
              url: `/repos/${config.GITHUB_USER}/${config.GITHUB_TARGET_REPO}/git/blobs/${item.sha}`
            })

            const markdown = atob(response.data.content ?? "")

            return (
              <div key={item.sha}>
                <Markdown markdown={markdown}/>
              </div>
            )
          }
        })}
      </div>
    </main>
  )
}
