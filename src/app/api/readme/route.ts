import { NextResponse } from "next/server"
import axios from "axios"
import config from "@/utils/config"

export async function GET() {
  const response = await axios.get(`${config.GITHUB_API_URL}/repos/${config.GITHUB_USER}/${config.GITHUB_TARGET_REPO}/contents/README.md`, {
    headers: {
      "Authorization": `Bearer ${config.GITHUB_TOKEN}`
    }
  })

  const { content } = await response.data

  return NextResponse.json(content)
}
