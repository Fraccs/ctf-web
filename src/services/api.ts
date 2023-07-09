import AxiosInstanceCreator from "@/services/AxiosInstanceCreator"

const headers =  {
  "Content-Type": "application/json"
}

const apiService = new AxiosInstanceCreator("/api", headers)

export default apiService
