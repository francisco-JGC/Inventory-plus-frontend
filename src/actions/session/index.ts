import { fetchData } from '@/utils/fetch-data'
import { toast } from 'sonner'
import { deleteCookie, setCookie } from 'cookies-next'

export const login = async (
  email: string,
  password: string,
): Promise<boolean> => {
  try {
    const response = await fetchData({
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
    const { data } = response as { data: any }
    setCookie('token', data.token)
    setCookie('username', data.username)
    setCookie('email', data.email)
    setCookie('role', data.role)
    return true
  } catch (error) {
    toast.error('Error al iniciar sesión', {
      description: 'revisa las credenciales',
    })
    return false
  }
}

export const logout = (): boolean => {
  try {
    deleteCookie('token')
    deleteCookie('username')
    deleteCookie('email')
    deleteCookie('role')

    toast.success('Sesión cerrada exitosamente')

    return true
  } catch (error) {
    toast.error('Error al cerrar sesión')
    return false
  }
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
