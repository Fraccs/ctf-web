import { getVersion } from "@/services/version"

export default async function Footer() {
  const version = await getVersion()

  return (
    <footer className="flex flex-col gap-2 p-2 bg-zinc-900 border-t border-zinc-800 text-xs text-white md:flex-row">
      <span className="flex-1 text-center underline">Version {version.tag_name}</span>
      <span className="flex-1 text-center underline">Copyright © 2023 - Francesco Aliprandi</span>
      <span className="flex-1 text-center underline">aliprandifrancescopp@gmail.com</span>
    </footer>
  )
}
