import { NextResponse } from "next/server"
import { GithubVersion } from "@/interfaces/github"
import githubService from "@/services/github"
import env from "@/config/env"

export async function GET() {
  const response = await githubService.apiRequest<GithubVersion>({
    url: `/repos/${env.GITHUB_USER}/${env.GITHUB_REPO}/releases/latest`
  })

  return NextResponse.json({
    version: response.data.tag_name
  })
}
