import { isGithubRootFile } from "@/lib/github"

describe("@/lib/github module", () => {
  describe("isGithubRootFile", () => {
    test("the passed fileName is in the root of the repository", () => {
      expect(isGithubRootFile("writeups-template.md")).toBeTruthy()
    })

    test("the passed fileName is not in the root of the repository", () => {
      expect(isGithubRootFile("arandomfile.ts")).toBeFalsy()
    })

    test("no fileName is passed", () => {
      expect(isGithubRootFile("")).toBeFalsy()
    })
  })
})
