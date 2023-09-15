"use client"

import { Button } from "@/components/ui/Button"

type ErrorProps = {
  error: Error,
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className="h-full flex items-center justify-center">
      <div className="flex flex-col gap-8 items-center">
        <div className="font-bold text-4xl">Oops.. {error.message}.</div>
        <Button onClick={reset} className="font-bold">
          Retry
        </Button>
      </div>
    </main>
  )
}
