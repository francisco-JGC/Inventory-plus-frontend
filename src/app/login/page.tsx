'use client'
import React, { FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { login } from '@/actions/session';
import useForm from '@/hooks/useForm';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface ILogin {
  email: string
  password: string
}

export default function LoginPage() {
  const { formValues, handleInputChange } = useForm<ILogin>({
    email: '',
    password: ''
  })

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formValues.email || !formValues.password)
      return toast.info('Por favor complete los campos')


    toast.loading('Iniciando sesión...')

    const response = await login(formValues.email, formValues.password)
    toast.dismiss()

    if (response) {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6"> Inicio de sesión</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Correo Electronico"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formValues.password}
              onChange={handleInputChange}
            />
          </div>

          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md">
            Iniciar sesión
          </Button>
        </form>

      </div >
    </div >
  );
}
