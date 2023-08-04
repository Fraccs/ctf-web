import LoginForm from "@/components/LoginForm"

export default function Page() {
  return (
    <main className="h-full w-full flex flex-col items-center justify-center bg-zinc-950">
      <div className="flex flex-col items-center justify-center gap-8">
        <span className="font-mono text-5xl text-zinc-300">ctf-web/login</span>
        <LoginForm/>
      </div>
    </main>
  )
}
