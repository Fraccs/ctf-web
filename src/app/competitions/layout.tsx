import { PropsWithChildren } from "react"
import { GithubGitTree, GithubGitTreeItem } from "@/interfaces/github"
import githubService from "@/services/github"
import config from "@/utils/config"
import Sidebar from "@/components/Sidebar"

export interface RepoTreeNode {
  path: string
  type: "blob" | "tree"
  sha: string
  sub?: RepoTreeNode[]
}

const getGithubGitTree = async () => {
  const response = await githubService.apiRequest<GithubGitTree>({
    url: `/repos/${config.GITHUB_USER}/${config.GITHUB_TARGET_REPO}/git/trees/${config.GITHUB_TREE_SHA}?recursive=true`
  })

  return response.data.tree
}

const githubGitTreeToRepoTree = (githubGitTree: GithubGitTreeItem[]): RepoTreeNode[] => {
  const nodes = githubGitTree
    ?.filter(node => node.path !== ".gitignore" && node.path !== "README.md" && node.path !== "writeups-template.md")

  const root: RepoTreeNode = { path: "/", type: "tree", sha: config.GITHUB_TREE_SHA, sub: [] }

  const map: { [path: string]: RepoTreeNode } = { "": root }

  nodes.forEach(node => {
    const parts = node.path.split("/")

    let parent = root

    for(let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const path = i === 0 ? part : `${parent.path}/${part}`

      if(!map[path]) {
        const newObject: RepoTreeNode = { path, type: node.type, sha: "", sub: [] }

        map[path] = newObject

        parent.sub?.push(newObject)
      }

      parent = map[path]
    }

    parent.sha = node.sha
  })

  /*
   * If a directory of a challenge is reached, the subdirectories/files are removed.
   * If any type of blob is contained in a directory, that directory is consedered
   * a challenge directory.
   */
  const fixDepths = (nodes?: RepoTreeNode[]) => {
    if(!nodes) {
      return
    }

    nodes?.forEach(node => {
      if(node.sub?.some(s => s.type === "blob")) {
        node.sub = []
      }

      fixDepths(node.sub)
    })

    return nodes
  }

  return fixDepths(root.sub) || []
}

export default async function Layout({ children }: PropsWithChildren) {
  const githubGitTree = await getGithubGitTree()
  const repoTree = githubGitTreeToRepoTree(githubGitTree)

  return (
    <main className="h-full w-full flex">
      <Sidebar repoTree={repoTree}/>
      {children}
    </main>
  )
}
