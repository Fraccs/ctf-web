import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { JwtContent } from "@/types/jwt"
import env from "@/config/env"

export default function serverUseAuth() {
  const token = cookies().get("jwt")?.value

  if(token && jwt.verify(token, env.JWT_SECRET)) {
    const jwtContent = jwt.decode(token, {
      json: true
    })

    if(jwtContent) {
      return jwtContent as JwtContent
    }
  }

  return null
}
