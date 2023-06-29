export interface GithubGitTree {
  sha: string
  url: string
  truncated: boolean
  tree: GithubGitTreeItem[]
}

export interface GithubGitTreeItem {
  path: string
  mode: string
  type: "blob" | "tree"
  sha: string
  size: number
  url: string
}
