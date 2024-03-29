const GITHUB_API_URL = process.env.GITHUB_API_URL ?? ""
const GITHUB_DEFAULT_BRANCH = process.env.GITHUB_DEFAULT_BRANCH ?? ""
const GITHUB_USER = process.env.GITHUB_USER ?? ""
const GITHUB_REPO = process.env.GITHUB_REPO ?? ""
const GITHUB_TARGET_REPO = process.env.GITHUB_TARGET_REPO ?? ""
const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? ""
const JWT_SECRET = process.env.JWT_SECRET ?? ""

const env = {
  GITHUB_API_URL,
  GITHUB_DEFAULT_BRANCH,
  GITHUB_USER,
  GITHUB_REPO,
  GITHUB_TARGET_REPO,
  GITHUB_TOKEN,
  JWT_SECRET
}

export default env
