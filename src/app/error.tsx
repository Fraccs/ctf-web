"use client"

type ErrorProps = {
  error: Error,
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="h-full flex items-center justify-center bg-zinc-950 text-white overflow-y-scroll">
      <div className="flex flex-col gap-8 items-center">
        <div className="font-bold text-4xl">Oops.. {error.message}.</div>
        <button onClick={reset} type="button" className="px-16 py-2 rounded-lg bg-gradient-to-br from-red-600 via-rose-600 to-red-500 font-bold text-center text-white shadow-2xl drop-shadow-2xl shadow-rose-600 hover:opacity-90">
          Retry
        </button>
      </div>
    </main>
  )
}
