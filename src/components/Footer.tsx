import Version from "./Version"

export default async function Footer() {
  return (
    <footer className="flex flex-col gap-1 p-2 bg-zinc-900 border-t border-zinc-800 text-xs text-white md:flex-row">
      <span className="flex-1 text-center underline">Version <Version/></span>
      <span className="flex-1 text-center underline">Copyright © 2023 - Francesco Aliprandi</span>
      <span className="flex-1 text-center underline">aliprandifrancescopp@gmail.com</span>
    </footer>
  )
}
