import { getGithubGitMainSha } from "@/utils/github"
import Directory from "@/components/Directory"

export default async function Page() {
  const sha = await getGithubGitMainSha()

  return (
    <main className="h-full w-full">
      <Directory sha={sha}/>
    </main>
  )
}
