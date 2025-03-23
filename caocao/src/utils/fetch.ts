type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

interface RequestOptions {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: BodyInit | null
}

interface HttpResponse<T> {
  data: T
  status: number
  statusText: string
  headers: Headers
}

class Http {
  private baseUrl: string
  private requestInterceptors: Array<(url: string, options: RequestOptions) => void>
  private responseInterceptors: Array<(response: Response) => void>

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl
    this.requestInterceptors = []
    this.responseInterceptors = []
  }

  // 添加请求拦截器
  addRequestInterceptor(interceptor: (url: string, options: RequestOptions) => void) {
    this.requestInterceptors.push(interceptor)
  }

  // 添加响应拦截器
  addResponseInterceptor(interceptor: (response: Response) => void) {
    this.responseInterceptors.push(interceptor)
  }

  // 核心请求方法
  // private async request<T>(url: string, options: RequestOptions): Promise<HttpResponse<T>> {
  private async request(url: string, options: RequestOptions): Promise<any> {
    const fullUrl = this.baseUrl + url

    // 执行请求拦截器
    this.requestInterceptors.forEach((interceptor) => interceptor(fullUrl, options))

    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        ...options.headers,
      },
    })

    // 执行响应拦截器
    this.responseInterceptors.forEach((interceptor) => interceptor(response))

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return {
      data: response.body,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    }
  }

  // GET 请求
  async get<T>(url: string, headers?: Record<string, string>): Promise<HttpResponse<T>> {
    return this.request<T>(url, {
      method: 'GET',
      headers,
    })
  }

  // POST 请求
  async post<T>(url: string, body: any, signal?: any, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
      signal
    }).then((response: HttpResponse<T>) => {
      return this.transformResponse(response)
    })
  }

  async transformResponse<T>(response: HttpResponse<T>): Promise<T> {
    return response.data
  }
}

// 创建一个全局实例 只能用localhost, 因为证书上是localhost
const http = new Http('https://localhost:8040')

export default http