import { getCookie } from 'cookies-next'

interface FetchDataParams<T> {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: T
  useToken?: boolean
}

export async function fetchData<TResponse, TData = any>({
  url,
  method,
  data,
  useToken = false,
}: FetchDataParams<TData>): Promise<TResponse> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (useToken) {
    const token = getCookie('token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    } else {
      throw new Error('Token no encontrado')
    }
  }

  const options: RequestInit = {
    method,
    headers,
  }

  if (method !== 'GET' && data) {
    options.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
      options,
    )

    return await response.json()
  } catch (error) {
    console.error('Error en la solicitud:', error)
    throw error
  }
}
