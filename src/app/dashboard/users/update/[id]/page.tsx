'use client'
import useForm from "@/hooks/useForm"
import { UserType } from "../../_components/addUser"
import { useEffect, useState } from "react"
import { getProviderById, updateProviderById } from "@/services/provider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { getUserById, updateUserById } from "@/services/user"

export interface IRoot {
  params: {
    id: string
  }
}

export default function Page({ params }: IRoot) {
  const { id } = params
  const { formValues, handleInputChange, setValues } = useForm<UserType>({} as any)

  const handleSubmitUpdate = async () => {
    toast.loading('Actualizando información...')

    const response = await updateUserById(formValues, Number(id))

    toast.dismiss()

    if (response.success) {
      toast.success('Informacion actualizada')
    } else {
      toast.error('Hubo un error en la solicitud')
    }
  }

  useEffect(() => {
    getUserById(Number(id))
      .then((response) => {
        if (response.success) {
          setValues(response.data as any)
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
      </div>

      <div>
        <Button onClick={handleSubmitUpdate}>
          Actualizar información
        </Button>
      </div>
    </div>
  )
}