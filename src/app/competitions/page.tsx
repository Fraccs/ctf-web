import { getGithubGitMainSha } from "@/utils/github"
import VisualizeTree from "@/components/VisualizeTree"

export default async function Page() {
  const sha = await getGithubGitMainSha()

  return (
    <main className="h-full w-full">
      <VisualizeTree sha={sha}/>
    </main>
  )
}
