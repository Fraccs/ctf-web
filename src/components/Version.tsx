"use client"

import { useEffect, useState } from "react"
import apiService from "@/services/api"

interface VersionResponse {
  version: string
}

export default function Version() {
  const [
    version,
    setVersion
  ] = useState("vX.Y.Z")

  useEffect(() => {
    const fetchVersion = async () => {
      const response = await apiService.apiRequest<VersionResponse>({
        url: "/version"
      })

      setVersion(response.data.version)
    }

    fetchVersion()
  }, [])

  return (
    <span>
      {version}
    </span>
  )
}
