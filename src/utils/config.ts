import dotenv from "dotenv"

dotenv.config()

const GITHUB_API_URL = process.env.GITHUB_API_URL
const GITHUB_USER = process.env.GITHUB_USER
const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_TARGET_REPO = process.env.GITHUB_TARGET_REPO
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const config = {
  GITHUB_API_URL,
  GITHUB_USER,
  GITHUB_REPO,
  GITHUB_TARGET_REPO,
  GITHUB_TOKEN
}

export default config
