"use client"

import { FormEvent, useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineKey, AiOutlineLogin, AiOutlineUser } from "react-icons/ai"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={onSubmit} className="w-96 flex flex-col items-center gap-4 text-white">
      <div className="w-full flex items-center gap-2 p-2 rounded-md border border-zinc-800">
        <AiOutlineUser/>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          className="bg-transparent focus:outline-none"
        />
      </div>
      <div className="w-full flex items-center gap-2 p-2 rounded-md border border-zinc-800">
        <AiOutlineKey/>
        <input
          type={isPasswordShown ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          className="bg-transparent focus:outline-none"
        />
        {isPasswordShown ?
          <button type="button" className="ml-auto" onClick={() => setIsPasswordShown(false)}>
            <AiOutlineEye className="hover:opacity-90"/>
          </button> :
          <button type="button" className="ml-auto" onClick={() => setIsPasswordShown(true)}>
            <AiOutlineEyeInvisible className="hover:opacity-90"/>
          </button>}
      </div>
      <button type="submit" className="w-full px-4 py-2 rounded-md border border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800 hover:opacity-90">
        <div className="flex items-center justify-center gap-2">
          <AiOutlineLogin className="text-xl"/>
          <span className="font-bold">Login</span>
        </div>
      </button>
    </form>
  )
}
