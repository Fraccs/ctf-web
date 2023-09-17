import env from "@/config/env"
import { GitHubRepoContent, GithubGitTreeItem } from "@/types/github"
import githubService from "@/services/github"
import serverUseAuth from "@/hooks/serverUseAuth"
import Flag from "@/components/Flag"
import Markdown from "@/components/Markdown"

export type DirectoryChallengeProps = {
  tree: GithubGitTreeItem[]
}

export default function DirectoryChallenge({ tree }: DirectoryChallengeProps) {
  const auth = serverUseAuth()

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
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
            <Markdown key={item.sha} markdown={markdown}/>
          )
        }
      })}
    </div>
  )
}
