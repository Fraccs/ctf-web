import { GithubVersion } from "@/types/github"
import githubService from "@/services/github"
import env from "@/config/env"

export default async function Footer() {
  const versionResponse = await githubService.apiRequest<GithubVersion>({
    url: `/repos/${env.GITHUB_USER}/${env.GITHUB_REPO}/releases/latest`
  })

  return (
    <footer className="flex flex-col gap-1 p-2 bg-zinc-900 border-t border-zinc-800 text-xs text-white md:flex-row">
      <a href={versionResponse?.data.html_url} target="_blank" className="flex-1 text-center">
        <span>Version: {versionResponse?.data.tag_name || "vX.Y.Z"}</span>
      </a>
      <span className="flex-1 text-center">Copyright © 2023 - Francesco Aliprandi</span>
      <span className="flex-1 text-center">License: MIT</span>
    </footer>
  )
}
