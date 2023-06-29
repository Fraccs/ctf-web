import VisualizeTree from "@/components/VisualizeTree"

interface PageProps {
  params: {
    sha: string
  }
}

export default async function Page({ params }: PageProps) {
  return (
    <VisualizeTree sha={params.sha}/>
  )
}
