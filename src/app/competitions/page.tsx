import Link from "next/link"
import competitionsService from "@/services/competitions"

export default async function Competitions() {
  const competitions = await competitionsService.getAll()

  return (
    <main className="h-full bg-zinc-950 text-white overflow-y-scroll">
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {competitions?.filter(c => c.type === "dir").map((competition, i) => {
          return (
            <Link key={i} href={`/competitions/${competition.name}`}>
              <article className="h-full flex flex-col rounded-lg bg-zinc-900 p-4 border border-zinc-800 shadow-lg">
                <span className="mt-auto rounded-lg px-4 py-2 border border-zinc-800 font-bold text-sm text-center">{competition.name}</span>
              </article>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
