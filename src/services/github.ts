import config from "@/utils/config"
import AxiosInstanceCreator from "./AxiosInstanceCreator"

const headers =  {
  "Accept": "application/vnd.github+json",
  "Authorization": `Bearer ${config.GITHUB_TOKEN}`,
  "X-GitHub-Api-Version": "2022-11-28"
}

const githubService = new AxiosInstanceCreator(`${config.GITHUB_API_URL}`, headers)

export default githubService