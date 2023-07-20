import { GithubGitTree } from "@/types/github"
import { RepoTree, RepoTreeNode } from "@/types/repoTree"

export const isGithubRootFile = (fileName: string): boolean => {
  // Files in the root of the repository
  const rootFiles = [
    ".gitignore",
    "README.md",
    "writeups-template.md"
  ]

  return rootFiles.includes(fileName)
}

export const traverseRepoTree = (repoTree: RepoTree, callback: (currentNode: RepoTreeNode) => void) => {
  const traverse = (currentNode: RepoTreeNode) => {
    if(!currentNode.sub) {
      return
    }

    callback(currentNode)

    currentNode.sub.forEach(n => {
      traverse(n)
    })
  }

  traverse(repoTree.root)
}

export const getRepoTreeNodeBySha = (repoTree: RepoTree, sha: string) => {
  let node: RepoTreeNode | undefined

  traverseRepoTree(repoTree, currentNode => {
    if(currentNode.sha === sha) {
      node = currentNode
    }
  })

  return node
}

export const getRepoTreeNodeParent = (repoTree: RepoTree, sha: string) => {
  let parent: RepoTreeNode | undefined

  traverseRepoTree(repoTree, currentNode => {
    currentNode.sub?.forEach(n => {
      if(n.sha === sha) {
        parent = currentNode
      }
    })
  })

  return parent
}

export const githubGitTreeToRepoTree = (githubGitTree: GithubGitTree): RepoTree => {
  const githubGitTreeItems = githubGitTree.tree.filter(item => !isGithubRootFile(item.path))

  const root: RepoTreeNode = { path: "/", type: "tree", sha: githubGitTree.sha, sub: [] }
  const repoTree: RepoTree = { root }

  const map: { [path: string]: RepoTreeNode } = { root }

  githubGitTreeItems.forEach(item => {
    const parts = item.path.split("/")

    let parent = root

    for(let i = 0; i < parts.length; i++) {
      const part = parts[i]
      const path = i === 0 ? part : `${parent.path}/${part}`

      if(!map[path]) {
        const newObject: RepoTreeNode = { path, type: item.type, sha: "", sub: [] }

        map[path] = newObject

        parent.sub?.push(newObject)
      }

      parent = map[path]
    }

    parent.sha = item.sha
  })

  /*
   * If a directory of a challenge is reached, the subdirectories/files are removed.
   * If any type of blob is contained in a directory, that directory is consedered
   * a challenge directory.
   */
  traverseRepoTree(repoTree, currentNode => {
    if(currentNode.sub?.some(n => n.type === "blob")) {
      currentNode.sub = []
    }
  })

  return repoTree
}
