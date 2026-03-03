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
import { Link } from "react-router-dom"
import { useAuthStore } from "@/stores/auth"
import { toast } from "sonner"
import { Eye, EyeOff, Lock, LogIn, Mail, UserPlus } from "lucide-react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const registerSchema = z.object({
  name : z.string().min(1, "Nome é obrigatório"),
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("Informe um e-mail válido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
  remember: z.boolean().optional(),
})

type RegisterFormData = z.infer<typeof registerSchema>

export function Signup() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const registerUser = useAuthStore((state) => state.signup)

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true)

    try {
      const registerMutate = await registerUser({
        email: data.email,
        password: data.password,
        name: data.name
      })

      if (registerMutate) {
        toast.success("Cadastro realizado com sucesso!")
      }
    } catch (error) {
      console.log(error)
      toast.error("Falha ao realizar o cadastro!")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/50 px-4">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center gap-6">
        <img src={logo} className="h-10 w-auto" alt="Financy" />

        <Card className="w-full rounded-sm bg-white shadow-sm border border-gray-400">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-xl font-semibold">Criar conta</CardTitle>
            <CardDescription>Comece a controlar suas finanças ainda hoje</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nome
                </label>

                <div className="relative">
                  <UserPlus className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    {...register("name")}
                    placeholder="Digite seu nome"

                    className="pl-10 h-12"
                    required
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  E-mail
                </label>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="mail@exemplo.com"
                    className="pl-10 h-12"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Senha
                </label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Digite sua senha"
                    className="pl-10 h-12"
                    required
                  />
                  
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-muted-foreground hover:bg-muted"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <p className="text-xs text-gray-400">
                  A senha deve ter no mínimo 8 caracteres
                </p>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-emerald-700 text-white hover:bg-emerald-800"
                disabled={loading}
              >
                {loading ? "Criando conta..." : "Cadastrar"}
              </Button>

              <div className="flex items-center gap-4 py-3">
                <div className="h-px flex-1 bg-gray-300" />
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  ou
                </span>
                <div className="h-px flex-1 bg-gray-300" />
              </div>

              <div className="space-y-3 text-center">
                <p className="text-sm text-muted-foreground">Já tem uma conta?</p>

                <Button variant="outline" className="w-full h-12" asChild>
                  <Link to="/login" className="flex items-center justify-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Fazer login
                  </Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}