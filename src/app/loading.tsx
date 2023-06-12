import Loader from "@/components/Loader"

export default function Loading() {
  return (
    <main className="h-full flex items-center justify-center bg-zinc-950 text-white overflow-y-scroll">
      <Loader/>
    </main>
  )
}
