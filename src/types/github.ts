import { Endpoints } from "@octokit/types"

export type GithubGitBranch = Endpoints["GET /repos/{owner}/{repo}/branches/{branch}"]["response"]["data"]

/* Forces the the properties of a `GithubGitTree["tree"]` to be `Required` and its `type` to be either `blob` or `tree" */
export type GithubGitTree = Omit<Endpoints["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"]["response"]["data"], "tree"> & {
  tree: [Required<Endpoints["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"]["response"]["data"]["tree"][0]> & {
    type: "blob" | "tree"
  }]
}

export type GithubGitBlob = Endpoints["GET /repos/{owner}/{repo}/git/blobs/{file_sha}"]["response"]["data"]
export type GithubLatestRealease = Endpoints["GET /repos/{owner}/{repo}/releases/latest"]["response"]["data"]
