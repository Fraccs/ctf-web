import githubService from "@/services/github"
import { GithubVersion } from "@/interfaces/github"
import config from "@/utils/config"

export default async function Footer() {
  const response = await githubService.apiRequest<GithubVersion>({
    url: `/repos/${config.GITHUB_USER}/${config.GITHUB_REPO}/releases/latest`
  })

  const version = response.data

  return (
    <footer className="flex flex-col gap-1 p-2 bg-zinc-900 border-t border-zinc-800 text-xs text-white md:flex-row">
      <span className="flex-1 text-center underline">Version {version.tag_name}</span>
      <span className="flex-1 text-center underline">Copyright © 2023 - Francesco Aliprandi</span>
      <span className="flex-1 text-center underline">aliprandifrancescopp@gmail.com</span>
    </footer>
  )
}
