import VisualizeTree from "@/components/VisualizeTree"

type PageProps = {
  params: {
    sha: string
  }
}

export default function Page({ params }: PageProps) {
  return (
    <main className="h-full w-full">
      <VisualizeTree sha={params.sha}/>
    </main>
  )
}
