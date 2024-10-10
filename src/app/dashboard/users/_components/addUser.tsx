import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useForm from "@/hooks/useForm"
import { createProvider } from "@/services/provider"
import { createUser } from "@/services/user"
import { FormEvent } from "react"
import { toast } from "sonner"
import { IUser } from "./usersList"

export interface UserType {
  username: string,
  email: string
  password: string
  role_name?: string
}

interface IProps {
  handleAddUser: (user: IUser) => void
}

export const AddUser = ({ handleAddUser }: IProps) => {
  const { formValues, resetForm, handleInputChange } = useForm<UserType>({
    username: '',
    email: '',
    password: '',
  })

  const handleSubmitCreateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    toast.loading('Creando Usuario...')

    const response = await createUser(formValues)
    toast.dismiss()

    if (!response.success) {
      return toast.error('Hubo un error al crear el Usuario', {
        description: response.message,
      })
    }
    toast.success('Usuario creado')
    handleAddUser(response.data as any)
    resetForm()
  }

  return <form className="flex flex-col gap-4" onSubmit={handleSubmitCreateUser}>
    <Input placeholder="Nombre" onChange={handleInputChange} name="username" value={formValues.username} />
    <Input placeholder="Email" onChange={handleInputChange} name="email" value={formValues.email} type="email" />
    <Input placeholder="Contraseña" onChange={handleInputChange} name="password" value={formValues.password} />

    <div className="mt-4">
      <Button type="submit">
        Crear Usuario
      </Button>
    </div>
  </form>
}