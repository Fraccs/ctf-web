export interface GithubGitBranch {
  name: string
  commit: {
    sha: string
    url: string
  }
  protected: boolean
}

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

export interface GitHubRepoContent {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string | null
  type: string
  content?: string
  encoding?: string
  _links?: {
    self: string
    git: string
    html: string
  }
}

export interface GithubVersion {
  url: string
  html_url: string
  id: number
  tag_name: string
  name: string
  draft: false
  prerelease: false
  created_at: Date
  published_at: Date
  assets?: []
}
