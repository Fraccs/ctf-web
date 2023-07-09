import { getGithubGitMainSha } from "@/utils/github"
import VisualizeTree from "@/components/VisualizeTree"

export default async function Competitions() {
  const sha = await getGithubGitMainSha()

  return (
    <VisualizeTree sha={sha}/>
  )
}
