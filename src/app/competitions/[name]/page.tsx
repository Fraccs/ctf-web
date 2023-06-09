import Link from "next/link"
import competitionsService from "@/services/competitions"

interface CompetitionProps {
  params: { name: string }
}

export default async function Competition({ params }: CompetitionProps) {
  const competitions = await competitionsService.getAll()

  // Check if `params.name` is a valid competition
  if(!competitions
    .filter(c => c.type === "dir")
    .map(c => c.name)
    .includes(params.name)
  ) {
    return (
      <></> // TODO: Handle errors with next `error.tsx`
    )
  }

  const editions = await competitionsService.getOne(params.name)

  return (
    <main className="h-full bg-zinc-950 text-white overflow-y-scroll">
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {editions?.map((edition, i) => {
          return (
            <Link key={i} href={`/competitions/${params.name}/${edition.name}`}>
              <article className="h-full flex flex-col rounded-lg bg-zinc-900 p-4 border border-zinc-800 shadow-lg">
                <span className="mt-auto rounded-lg px-4 py-2 border border-zinc-800 font-bold text-sm text-center">{edition.name}</span>
              </article>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
