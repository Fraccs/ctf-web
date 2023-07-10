import { NextResponse } from "next/server"
import { GitHubRepoContent } from "@/interfaces/github"
import githubService from "@/services/github"
import env from "@/config/env"

export async function GET() {
  const response = await githubService.apiRequest<GitHubRepoContent>({
    url: `/repos/${env.GITHUB_USER}/${env.GITHUB_TARGET_REPO}/contents/README.md`
  })

  return NextResponse.json({
    readme: response.data.content
  })
}
