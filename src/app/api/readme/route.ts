import { NextResponse } from "next/server"
import { GitHubRepoContent } from "@/interfaces/github"
import githubService from "@/services/github"
import config from "@/utils/config"

export async function GET() {
  const response = await githubService.apiRequest<GitHubRepoContent>({
    url: `/repos/${config.GITHUB_USER}/${config.GITHUB_TARGET_REPO}/contents/README.md`
  })

  return NextResponse.json(response.data.content)
}
