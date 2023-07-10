export default interface RepoTree {
  root: RepoTreeNode
}

export interface RepoTreeNode {
  path: string
  type: "blob" | "tree"
  sha: string
  sub?: RepoTreeNode[]
}
