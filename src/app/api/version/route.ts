import { NextResponse } from "next/server"
import { GithubVersion } from "@/interfaces/github"
import githubService from "@/services/github"
import config from "@/utils/config"

export async function GET() {
  const response = await githubService.apiRequest<GithubVersion>({
    url: `/repos/${config.GITHUB_USER}/${config.GITHUB_REPO}/releases/latest`
  })

  return NextResponse.json({
    version: response.data.tag_name
  })
}
