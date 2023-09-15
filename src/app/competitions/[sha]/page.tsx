import Directory from "@/components/Directory"

type PageProps = {
  params: {
    sha: string
  }
}

export default function Page({ params }: PageProps) {
  return (
    <main className="flex-1 w-full flex flex-col">
      <Directory sha={params.sha}/>
    </main>
  )
}
