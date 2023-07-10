import AxiosInstanceCreator from "@/utils/AxiosInstanceCreator"
import env from "@/config/env"

const headers =  {
  "Accept": "application/vnd.github+json",
  "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
  "X-GitHub-Api-Version": "2022-11-28"
}

const githubService = new AxiosInstanceCreator(`${env.GITHUB_API_URL}`, headers)

export default githubService
