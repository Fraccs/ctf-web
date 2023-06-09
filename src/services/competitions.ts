import axios from "axios"
import { CompetitionRaw } from "@/interfaces/competition"
import config from "@/utils/config"

const baseUrl = `${config.GITHUB_API_URL}/repos/${config.GITHUB_USER}/${config.GITHUB_TARGET_REPO}/contents`

const getAll = async (): Promise<CompetitionRaw[]> => {
  try {
    const response = await axios.get(baseUrl, {
      headers: {
        "Authorization": `Bearer ${config.GITHUB_TOKEN}`
      }
    })

    return response.data
  }
  catch(e) {
    console.error(e)

    return []
  }
}

const getOne = async (name: string): Promise<CompetitionRaw[]> => {
  try {
    const response = await axios.get(`${baseUrl}/${name}`, {
      headers: {
        "Authorization": `Bearer ${config.GITHUB_TOKEN}`
      }
    })

    return response.data
  }
  catch(e) {
    console.error(e)

    return []
  }
}

const competitionsService = {
  getAll,
  getOne
}

export default competitionsService
