import Link from "next/link"
import githubService from "@/services/github"
import config from "@/utils/config"
import { GithubGitTree } from "@/interfaces/github"

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
        {tree?.map(item => {
          if(item.type === "tree") {
            return (
              <Link key={item.sha} href={`/competitions/${item.sha}`}>
                <article className="h-full flex flex-col rounded-lg bg-zinc-900 p-4 border border-zinc-800 shadow-lg">
                  <span className="mt-auto rounded-lg px-4 py-2 border border-zinc-800 font-bold text-sm text-center">{item.path}</span>
                </article>
              </Link>
            )
          }

          if(item.path.includes("flag.txt") || item.path.includes("writeup.md")) {
            return (
              <article key={item.sha} className="h-full flex flex-col rounded-lg bg-zinc-900 p-4 border border-zinc-800 shadow-lg">
                <span className="mt-auto rounded-lg px-4 py-2 border border-zinc-800 font-bold text-sm text-center">{item.path}</span>
              </article>
            )
          }
        })}
      </div>
    </main>
  )
}
