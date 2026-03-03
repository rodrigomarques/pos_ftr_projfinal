import { useState } from "react"
import logo from "@/assets/logo.svg"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { LogOut, Mail, User } from "lucide-react"
import { Page } from "@/components/Page"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuthStore } from "@/stores/auth"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"

const userSchema = z.object({
  id: z.string().optional(),
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Informe um e-mail válido"),
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(6, "Nome deve ter pelo menos 6 caracteres"),
})

type UserFormData = z.infer<typeof userSchema>

export function MyAccount() {

  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<UserFormData>({
      resolver: zodResolver(userSchema),
      defaultValues: {
        email: user?.email || "",
        name: user?.name || "",
      },
      values: {
        email: user?.email || "",
        name: user?.name || "",
      },
    })

  const [loading, setLoading] = useState(false)

  const update = useAuthStore((state) => state.update)
  const onSubmit = async (values: UserFormData) => {
    setLoading(true)

    try {
     const updateMutate = await update({
        id: user?.id || "",
        email: values.email,
        name: values.name,
      })

      if (updateMutate) {
        toast.success("Usuário atualizado com sucesso!")
      }
    } catch (error) {
      console.log(error)
      toast.error("Falha ao atualizar o usuário!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page>
      <div className="min-h-screen bg-muted/50 px-4">
        <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center gap-6 ">

          <Card className="w-full rounded-sm bg-white   border-gray-200">
            <CardHeader className="items-center text-center">
              <CardTitle className="text-xl font-semibold text-center flex items-center gap-2 justify-center">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gray-400 text-xl text-black ">
                    {user?.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </CardTitle>
              <CardDescription>
                <p className="font-medium">
                  {user?.name}
                </p>
                <p className="text-sm text-gray-500">
                  {user?.email}
                </p>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-4 py-3">
                <div className="h-px flex-1 bg-gray-300" />
              </div>

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} >
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nome completo
                  </label>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground text-gray-500" />
                    <Input
                      id="name"
                      type="text"
                      {...register("name")}
                      placeholder="Nome completo"
                      className="pl-10 h-12 border-gray-300"
                      required
                    />
                  </div>
                  
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    E-mail
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="mail@exemplo.com"
                      className="pl-10 h-12 border-gray-300"
                      required
                      {...register("email")}
                    />
                  </div>
                  <p className="text-xs text-gray-400">
                    O e-mail não pode ser alterado
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-emerald-700 text-white hover:bg-emerald-800"
                >
                  { loading ? "Salvando..." : "Salvar alterações" }
                </Button>

                <Button variant="outline" className="w-full h-12" asChild>
                  <Button className="flex items-center justify-center gap-2" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 text-red-500" />
                    Sair da conta
                  </Button>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Page>
  )
}