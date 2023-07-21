import Directory from "@/components/Directory"

type PageProps = {
  params: {
    sha: string
  }
}

export default function Page({ params }: PageProps) {
  return (
    <main className="h-full w-full">
      <Directory sha={params.sha}/>
    </main>
  )
}
