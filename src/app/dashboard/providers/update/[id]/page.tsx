'use client'
import useForm from "@/hooks/useForm"
import { IProvider } from "../../_components/providersList"
import { useEffect, useState } from "react"
import { getProviderById, updateProviderById } from "@/services/provider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export interface IRoot {
  params: {
    id: string
  }
}

export default function Page({ params }: IRoot) {
  const { id } = params
  const { formValues, handleInputChange, setValues } = useForm<IProvider>({} as any)

  const handleSubmitUpdate = async () => {
    toast.loading('Actualizando información...')

    const response = await updateProviderById(formValues, Number(id))

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
    getProviderById(Number(id))
      .then((response) => {
        if (response.success) {
          setValues(response.data as any)
        }
      })
  }, [])


  return (
    <div className="bg-white p-4 rounded-sm shadow flex flex-col gap-8">
      <header>
        <h1 className="font-bold">Actualizacion de proveedor, porfavor llene todos los campos requeridos</h1>
      </header>

      <div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">Nombre del proveedor</label>
          <Input name="name" value={formValues.name} onChange={handleInputChange} required />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">Correo Electronico</label>
          <Input name="email" value={formValues.email} onChange={handleInputChange} type="email" required />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">Dirección</label>
          <Input name="address" value={formValues.address} onChange={handleInputChange} required />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">Telefono</label>
          <Input name="phone" value={formValues.phone} onChange={handleInputChange} required />
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