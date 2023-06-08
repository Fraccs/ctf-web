import { getVersion } from "@/services/version"

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
