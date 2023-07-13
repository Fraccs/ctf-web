export type RepoTree = {
  root: RepoTreeNode
}

export type RepoTreeNode = {
  path: string
  type: "blob" | "tree"
  sha: string
  sub?: RepoTreeNode[]
}
