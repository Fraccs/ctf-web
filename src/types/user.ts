export type User = {
  id: string
  username: string
  password: string
  permissions: "admin" | "user"
}

export type UserLogin = Omit<User, "id" | "permissions">

export type UserPartial = Omit<User, "id">
