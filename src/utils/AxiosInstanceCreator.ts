import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

type ApiResponse<T> = {
  data: T
  status: number
  message: string
}

export default class AxiosInstanceCreator {
  instance: AxiosInstance

  constructor(baseURL: string, headers: any) {
    this.instance = axios.create({
      baseURL,
      headers
    })
  }

  async apiRequest<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response: AxiosResponse<T> = await this.instance.request<T>(config)

    return {
      data: response.data,
      status: response.status,
      message: response.statusText
    }
  }
}
