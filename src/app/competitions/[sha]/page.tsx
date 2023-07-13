import VisualizeTree from "@/components/VisualizeTree"

type PageProps = {
  params: {
    sha: string
  }
}

export default async function Page({ params }: PageProps) {
  return (
    <VisualizeTree sha={params.sha}/>
  )
}
