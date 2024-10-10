import { getCookie } from 'cookies-next'

interface DownloadFileParams {
  url: string
  fileType?: string
  fileName?: string
  useToken?: boolean
}

export async function fetchFile({
  url,
  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  fileName = 'report.xlsx',
  useToken = false,
}: DownloadFileParams): Promise<void> {
  const headers: HeadersInit = {}

  if (useToken) {
    const token = getCookie('token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    } else {
      throw new Error('Token no encontrado')
    }
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      throw new Error('Error en la descarga del archivo')
    }

    const blob = await response.blob()

    const downloadUrl = window.URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = downloadUrl
    a.download = fileName
    document.body.appendChild(a)
    a.click()

    a.remove()
    window.URL.revokeObjectURL(downloadUrl)
  } catch (error) {
    console.error('Error en la solicitud de descarga:', error)
    throw error
  }
}
