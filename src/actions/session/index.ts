import { fetchData } from '@/utils/fetch-data'
import { toast } from 'sonner'
import { setCookie } from 'cookies-next'

export const login = async (
  email: string,
  password: string,
): Promise<boolean> => {
  try {
    const response = await fetchData<any>({
      url: '/auth/login',
      method: 'POST',
      data: { email, password },
    })

    toast.dismiss()

    if (!response.success) {
      toast.error('Error al iniciar sesión', {
        description: response.message,
      })
      return false
    }

    toast.success('Inicio de sesión exitoso!')
    setCookie('token', response.data.token)
    return true
  } catch (error) {
    toast.error('Error al iniciar sesión', {
      description: 'revisa las credenciales',
    })
    return false
  }
}

export const logout = (): void => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('user')
}

export const getSession = () => {
  const token = localStorage.getItem('authToken')
  if (!token) {
    return null
  }

  const user = localStorage.getItem('user')
  return {
    token,
    user: user ? JSON.parse(user) : null,
  }
}
