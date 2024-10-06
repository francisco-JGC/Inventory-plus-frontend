import { UserType } from '@/app/dashboard/users/_components/addUser'
import { IUser } from '@/app/dashboard/users/_components/usersList'
import { fetchData, IHandleResponse, IPagination } from '@/utils/fetch-data'
import { toast } from 'sonner'

export const createUser = async (user: UserType): Promise<IHandleResponse> => {
  toast.loading('Creando usuario', {
    description: 'Espere un momento...',
  })

  return await fetchData({
    url: '/users/create',
    data: user,
    method: 'POST',
    useToken: true,
  })
}

export const getAllUser = async (): Promise<IHandleResponse> => {
  return await fetchData({
    url: '/users/',
    method: 'GET',
    useToken: true,
  })
}

export const getPaginationUser = async ({
  filter,
  page,
  limit,
}: IPagination): Promise<IHandleResponse> => {
  return await fetchData({
    url: `/users/${page}/${limit}/${filter}`,
    method: 'GET',
    useToken: true,
  })
}

export const deleteUserById = async (id: number) => {
  return await fetchData({
    url: '/users/delete',
    method: 'POST',
    data: {
      id,
    },
    useToken: true,
  })
}

export const getUserById = async (id: number) => {
  return await fetchData({
    url: `/users/${id}`,
    method: 'GET',
    useToken: true,
  })
}

export const updateUserById = async (user: UserType, id: number) => {
  return await fetchData({
    url: `/users/update/${id}`,
    method: 'POST',
    data: user,
    useToken: true,
  })
}
