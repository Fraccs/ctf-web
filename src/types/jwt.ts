import { User } from "@/types/user"

export type JwtContent = Omit<User, "password"> & {
  iat: number
  exp: number
}
