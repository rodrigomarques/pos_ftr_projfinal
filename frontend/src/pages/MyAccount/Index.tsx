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
import { LogOut, Mail, User } from "lucide-react"
import { Page } from "@/components/Page"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"


export function MyAccount() {

  const [showPassword, setShowPassword] = useState(false)
  const user2 = {
    name: "John Doe",
    email: "johndue@gmail.com"
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
                    {user2?.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </CardTitle>
              <CardDescription>
                <p className="font-medium">
                  {user2?.name}
                </p>
                <p className="text-sm text-gray-500">
                  {user2?.email}
                </p>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-4 py-3">
                <div className="h-px flex-1 bg-gray-300" />
              </div>

              <form className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="nome" className="text-sm font-medium">
                    Nome completo
                  </label>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground text-gray-500" />
                    <Input
                      id="nome"
                      type="text"
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
                  Salvar alterações
                </Button>

                <Button variant="outline" className="w-full h-12" asChild>
                  <Link to="/signup" className="flex items-center justify-center gap-2">
                    <LogOut className="h-4 w-4 text-red-500" />
                    Sair da conta
                  </Link>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Page>
  )
}