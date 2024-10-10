import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useForm from "@/hooks/useForm"
import { createProvider } from "@/services/provider"
import { FormEvent } from "react"
import { toast } from "sonner"

export interface ProviderTypes {
  name: string,
  email: string
  phone: string
  address: string
}

interface IProps {
  handleAddProvider: (provider: ProviderTypes) => void
}

export const AddProvider = ({ handleAddProvider }: IProps) => {
  const { formValues, resetForm, handleInputChange } = useForm<ProviderTypes>({
    name: '',
    address: '',
    phone: '',
    email: '',
  })

  const handleCreateProvider = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formValues.name) {
      return toast.warning('El nombre de la Proveedor es requerido')
    }
    toast.loading('Creando Proveedor...')

    const response = await createProvider(formValues)
    toast.dismiss()

    if (!response.success) {
      return toast.error('Hubo un error al crear el Proveedor', {
        description: response.message,
      })
    }
    toast.success('Proveedor creado')
    handleAddProvider(response.data as any)
    resetForm()
  }

  return <form className="flex flex-col gap-4" onSubmit={handleCreateProvider}>
    <Input placeholder="Nombre" onChange={handleInputChange} name="name" value={formValues.name} />
    <Input placeholder="Email" onChange={handleInputChange} name="email" value={formValues.email} type="email" />
    <Input placeholder="Telefono" onChange={handleInputChange} name="phone" value={formValues.phone} />
    <Input placeholder="Dirección" onChange={handleInputChange} name="address" value={formValues.address} />


    <div className="mt-4">
      <Button type="submit">
        Crear Proveedor
      </Button>
    </div>
  </form>
}