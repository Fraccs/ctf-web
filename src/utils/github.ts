import { GithubGitBranch, GithubGitTree, GithubGitTreeItem } from "@/interfaces/github"
import { RepoTreeNode } from "@/interfaces/repoTree"
import githubService from "@/services/github"
import env from "@/config/env"

export const getGithubGitTree = async (sha: string, recursive?: boolean) => {
  const response = await githubService.apiRequest<GithubGitTree>({
    url: `/repos/${env.GITHUB_USER}/${env.GITHUB_TARGET_REPO}/git/trees/${sha}${recursive ? "?recursive=true" : ""}`
  })

  return response.data
}

export const getGithubGitMainSha = async () => {
  const response = await githubService.apiRequest<GithubGitBranch[]>({
    url: `/repos/${env.GITHUB_USER}/${env.GITHUB_TARGET_REPO}/branches`
  })

  return response.data.find(item => item.name === "main")?.commit.sha!
}

export const githubGitTreeToRepoTree = (githubGitTree: GithubGitTreeItem[]): RepoTreeNode[] => {
  const nodes = githubGitTree
    ?.filter(node => node.path !== ".gitignore" && node.path !== "README.md" && node.path !== "writeups-template.md")

  const root: RepoTreeNode = { path: "/", type: "tree", sha: "", sub: [] }

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
