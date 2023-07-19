import { GithubGitBranch, GithubGitTree } from "@/types/github"
import githubService from "@/services/github"
import env from "@/config/env"

export const getGithubGitTree = async (sha: string, recursive?: boolean) => {
  const response = await githubService.apiRequest<GithubGitTree>({
    url: `/repos/${env.GITHUB_USER}/${env.GITHUB_TARGET_REPO}/git/trees/${sha}${recursive ? "?recursive=true" : ""}`
  })

  return response.data
}

export const getGithubGitMainSha = async () => {
  const response = await githubService.apiRequest<GithubGitBranch[]>({
    url: `/repos/${env.GITHUB_USER}/${env.GITHUB_TARGET_REPO}/branches`
  })

  return response.data.find(item => item.name === "main")?.commit.sha!
}
