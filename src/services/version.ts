import axios from "axios"
import config from "@/utils/config"

export const getVersion = async () => {
  try {
    const response = await axios.get(`
      ${config.GITHUB_API_URL}/repos/${config.GITHUB_USER}/${config.GITHUB_REPO}/releases/latest
    `, {
      headers: {
        "Authorization": `Bearer ${config.GITHUB_TOKEN}`
      }
    })

    return response.data
  }
  catch(e) {
    console.error(e)

    return {
      tag_name: "vX.Y.Z"
    }
  }
}
