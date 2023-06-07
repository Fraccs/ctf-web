import Link from "next/link"

export default function Home() {
  return (
    <main className="h-full flex flex-col items-center justify-center gap-16 bg-zinc-950">
      <span className="p-2 font-bold text-5xl text-transparent italic bg-clip-text bg-gradient-to-r from-zinc-950 via-white to-zinc-950 animate-gradient-x">&quot;Collection of <span className="text-rose-600">CTF</span> solves and writeups&quot;</span>
      <div className="w-full flex items-center justify-center gap-16">
        <Link href="/readme" className="px-4 py-2 rounded-lg bg-gradient-to-br bg-white font-bold text-center shadow-2xl drop-shadow-2xl shadow-white hover:opacity-90">
          README.md
        </Link>
        <Link href="/competitions" className="px-4 py-2 rounded-lg bg-gradient-to-br from-red-600 via-rose-600 to-red-500 font-bold text-center text-white shadow-2xl drop-shadow-2xl shadow-rose-600 hover:opacity-90">
          Competitions
        </Link>
      </div>
    </main>
  )
}
