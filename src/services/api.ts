import AxiosInstanceCreator from "@/utils/AxiosInstanceCreator"

const headers =  {
  "Content-Type": "application/json"
}

const apiService = new AxiosInstanceCreator("/api", headers)

export default apiService
