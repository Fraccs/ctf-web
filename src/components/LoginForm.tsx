"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { AiOutlineCloseCircle, AiOutlineEye, AiOutlineEyeInvisible, AiOutlineKey, AiOutlineLogin, AiOutlineUser } from "react-icons/ai"
import apiService from "@/services/api"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { push, refresh } = useRouter()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if(!username || !password) {
      return
    }

    try {
      setIsLoading(true)

      await apiService.apiRequest({
        url: "/auth",
        method: "POST",
        data: {
          username,
          password
        }
      })

      push("/")
      refresh()
    }
    catch(e) {
      setIsError(true)
    }
    finally {
      setIsLoading(false)
      setUsername("")
      setPassword("")
    }
  }

  useEffect(() => {
    if(isError) {
      setTimeout(() => {
        setIsError(false)
      }, 2000)
    }
  }, [isError])

  return (
    <form onSubmit={onSubmit} className="w-96 flex flex-col items-center gap-4">
      <div className="w-full flex items-center gap-2 p-2 rounded-md border">
        <AiOutlineUser/>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          className="bg-transparent focus:outline-none"
        />
      </div>
      <div className="w-full flex items-center gap-2 p-2 rounded-md border">
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
      <button type="submit" className={`w-full px-4 py-2 rounded-md border bg-gradient-to-r ${isLoading || isError ? "from-zinc-800 via-rose-600 to-zinc-800 animate-gradient-x animate-pulse" : "from-zinc-900 to-zinc-800"} hover:opacity-90`}>
        <div className="flex items-center justify-center gap-2">
          {isError ?
            <>
              <AiOutlineCloseCircle className="text-xl"/>
              <span className="font-bold">Error</span>
            </> :
            <>
              <AiOutlineLogin className="text-xl"/>
              <span className="font-bold">Login</span>
            </>}
        </div>
      </button>
    </form>
  )
}
