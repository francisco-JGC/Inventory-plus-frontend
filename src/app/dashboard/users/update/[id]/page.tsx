'use client'
import useForm from "@/hooks/useForm"
import { UserType } from "../../_components/addUser"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { getUserById, updateUserById } from "@/services/user"
import { getAllRoles } from "@/services/role"

export interface IRoot {
  params: {
    id: string
  }
}

interface IRoles {
  id: number
  name: string
  label: string
  description: string
  created_at: Date
}

export default function Page({ params }: IRoot) {
  const { id } = params
  const { formValues, handleInputChange, setValues } = useForm<UserType>({} as any)
  const [roles, setRoles] = useState<IRoles[]>([])

  const handleSubmitUpdate = async () => {
    toast.loading('Actualizando información...')

    const response = await updateUserById(formValues, Number(id))

    toast.dismiss()

    if (response.success) {
      toast.success('Informacion actualizada')
    } else {
      toast.error('Hubo un error en la solicitud', {
        description: response.message,
      })
    }
  }

  useEffect(() => {
    getUserById(Number(id))
      .then((response) => {
        if (response.success) {

          const { data } = response as { data: any }

          setValues({
            username: data?.username || '',
            email: data.email,
            password: '',
            role_name: data.roles[0]?.name || ''
          })
        }
      })

    getAllRoles()
      .then((response) => {
        if (response.success) {
          setRoles(response.data as any)
        }
      })
  }, [])


  return (
    <div className="bg-white p-4 rounded-sm shadow flex flex-col gap-8">
      <header>
        <h1 className="font-bold">Actualizacion de usuario, porfavor llene todos los campos requeridos</h1>
      </header>

      <div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">Nombre de usuario</label>
          <Input name="username" value={formValues.username} onChange={handleInputChange} required />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">Correo Electronico</label>
          <Input name="email" value={formValues.email} onChange={handleInputChange} type="email" required />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">Contraseña</label>
          <Input name="password" value={formValues.password} onChange={handleInputChange} required />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="">Rol del usuario</label>
          <select onChange={(e) => {
            handleInputChange({ target: { name: e.currentTarget.name, value: e.currentTarget.value } } as any)
          }}
            name="role_name"
            value={formValues.role_name}
            defaultValue={formValues.role_name}
            className="p-2 bg-gray-100 rounded-lg border-2"
          >
            <option value="" disabled>Seleccione un rol</option>
            {
              roles.length > 0 && roles.map(item => {
                return (
                  <option value={item.name} key={item.id}>{item.label}</option>
                )
              })
            }
          </select>
        </div>
      </div>

      <div>
        <Button onClick={handleSubmitUpdate}>
          Actualizar información
        </Button>
      </div>
    </div>
  )
}