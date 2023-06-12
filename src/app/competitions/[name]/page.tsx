import Link from "next/link"
import githubService from "@/services/github"
import config from "@/utils/config"
import { GitHubRepoContent } from "@/interfaces/github"

interface CompetitionProps {
  params: { name: string }
}

export default async function Competition({ params }: CompetitionProps) {
  const competitionsResponse = await githubService.apiRequest<GitHubRepoContent[]>({
    url: `/repos/${config.GITHUB_USER}/${config.GITHUB_TARGET_REPO}/contents`
  })

  const competitions = competitionsResponse.data

  // Check if `params.name` is a valid competition
  if(!competitions
    .filter(c => c.type === "dir")
    .map(c => c.name)
    .includes(params.name)
  ) {
    throw new Error("The competition doesn't exist")
  }

  const editionsResponse = await githubService.apiRequest<GitHubRepoContent[]>({
    url: `/repos/${config.GITHUB_USER}/${config.GITHUB_TARGET_REPO}/contents/${params.name}`
  })

  const editions = editionsResponse.data

  return (
    <main className="h-full bg-zinc-950 text-white overflow-y-scroll">
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {editions?.map((edition, i) => {
          return (
            <Link key={i} href={`/competitions/${params.name}/${edition.name}`}>
              <article className="h-full flex flex-col rounded-lg bg-zinc-900 p-4 border border-zinc-800 shadow-lg">
                <span className="mt-auto rounded-lg px-4 py-2 border border-zinc-800 font-bold text-sm text-center">{edition.name}</span>
              </article>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
