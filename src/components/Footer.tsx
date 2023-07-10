import { GithubVersion } from "@/interfaces/github"
import githubService from "@/services/github"
import env from "@/config/env"

export default async function Footer() {
  const versionResponse = await githubService.apiRequest<GithubVersion>({
    url: `/repos/${env.GITHUB_USER}/${env.GITHUB_REPO}/releases/latest`
  }).catch(e => console.error(e))

  return (
    <footer className="flex flex-col gap-1 p-2 bg-zinc-900 border-t border-zinc-800 text-xs text-white md:flex-row">
      <span className="flex-1 text-center underline">Version {versionResponse?.data.tag_name || "vX.Y.Z"}</span>
      <span className="flex-1 text-center underline">Copyright © 2023 - Francesco Aliprandi</span>
      <span className="flex-1 text-center underline">aliprandifrancescopp@gmail.com</span>
    </footer>
  )
}
