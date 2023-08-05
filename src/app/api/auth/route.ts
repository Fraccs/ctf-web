import { sql } from "@vercel/postgres"
import { cookies } from "next/headers"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { User, UserLogin } from "@/types/user"
import env from "@/config/env"
import { MONTH_IN_SECONDS } from "@/utils/constants"

export async function GET() {
  const token = cookies().get("jwt")?.value

  if(!token || !jwt.verify(token, env.JWT_SECRET)) {
    return new Response(JSON.stringify({
      auth: false
    }), {
      status: 401
    })
  }

  const decodedToken = jwt.decode(token)

  return new Response(JSON.stringify(decodedToken), {
    status: 200
  })
}

export async function POST(request: Request) {
  const { username, password }: UserLogin = await request.json()

  if(!/^[a-zA-Z0-9](_(?!(-|_))|-(?!(_|-))|[a-zA-Z0-9]){4,16}[a-zA-Z0-9]$/.test(username)) {
    return new Response(JSON.stringify({
      error: "The username doesn't follow the right format"
    }), {
      status: 400
    })
  }

  if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/.test(password)) {
    return new Response(JSON.stringify({
      error: "The password doesn't follow the right format"
    }), {
      status: 400
    })
  }

  const queryResult = await sql<User>`
    SELECT id, username, password, permissions
    FROM users
    WHERE username=${username}
  `

  if(queryResult.rowCount <= 0) {
    return new Response(JSON.stringify({
      error: "Wrong username or password"
    }), {
      status: 401
    })
  }

  const isPasswordCorrect = await bcrypt.compare(password, queryResult.rows[0].password)

  if(!isPasswordCorrect) {
    return new Response(JSON.stringify({
      error: "Wrong username or password"
    }), {
      status: 401
    })
  }

  const userData: Omit<User, "password"> = {
    id: queryResult.rows[0].id,
    username: queryResult.rows[0].username,
    permissions: queryResult.rows[0].permissions,
  }

  const token = jwt.sign(userData, env.JWT_SECRET, {
    expiresIn: MONTH_IN_SECONDS
  })

  const headers = new Headers({
    "Set-Cookie": `jwt=${token}; HttpOnly; Path=/;Max-Age=${MONTH_IN_SECONDS}`
  })

  return new Response(JSON.stringify({
    auth: true
  }), {
    status: 200,
    headers
  })
}
