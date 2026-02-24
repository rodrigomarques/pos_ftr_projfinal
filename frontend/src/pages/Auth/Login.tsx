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
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom"
import { useAuthStore } from "@/stores/auth"
import { toast } from "sonner"
import { Eye, EyeOff, Lock, Mail, UserPlus } from "lucide-react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const loginSchema = z.object({
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

type LoginFormData = z.infer<typeof loginSchema>

export function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const login = useAuthStore((state) => state.login)

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)

    try {
      const loginMutate = await login({
        email: data.email,
        password: data.password,
      })

      if (loginMutate) {
        toast.success("Login realizado com sucesso!")
      }
    } catch (error) {
      console.log(error)
      toast.error("Falha ao realizar o login!")
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
            <CardTitle className="text-xl font-semibold">Fazer login</CardTitle>
            <CardDescription>Entre na sua conta para continuar</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
              </div>

              {/* Lembrar-me / Recuperar */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Checkbox {...register("remember")} />
                  Lembrar-me
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-emerald-700 hover:underline"
                >
                  Recuperar senha
                </Link>
              </div>

              {/* Entrar */}
              <Button
                type="submit"
                className="w-full h-12 bg-emerald-700 text-white hover:bg-emerald-800"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>

              <div className="flex items-center gap-4 py-3">
                <div className="h-px flex-1 bg-gray-300" />
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  ou
                </span>
                <div className="h-px flex-1 bg-gray-300" />
              </div>

              <div className="space-y-3 text-center">
                <p className="text-sm text-muted-foreground">Ainda não tem uma conta?</p>

                <Button variant="outline" className="w-full h-12" asChild>
                  <Link to="/signup" className="flex items-center justify-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Criar conta
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