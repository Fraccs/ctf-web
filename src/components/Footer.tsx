import config from "@/utils/config"

const getVersion = async () => {
  const response = await fetch(`
    ${config.GITHUB_API_URL}/repos/${config.GITHUB_USER}/${config.GITHUB_REPO}/releases/latest
  `, {
    headers: {
      "Authorization": `Bearer ${config.GITHUB_TOKEN}`
    }
  })

  return response.json()
}

export default async function Footer() {
  const version = await getVersion()

  return (
    <footer className="flex p-2 bg-zinc-900 border-t border-zinc-800 text-xs text-white">
      <span className="flex-1 text-center">Version {version.tag_name}</span>
      <span className="flex-1 text-center">Copyright © 2023 - Francesco Aliprandi</span>
      <span className="flex-1 text-center">aliprandifrancescopp@gmail.com</span>
    </footer>
  )
}
