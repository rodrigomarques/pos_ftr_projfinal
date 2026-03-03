import { Link } from "react-router-dom"
import { useAuthStore } from "../stores/auth"
import logoIcon from "@/assets/logo-icon.svg"
import { Button } from "./ui/button"
import { useLocation } from "react-router-dom"
import { Avatar, AvatarFallback } from "./ui/avatar"

export function Header() {
  const { user,isAuthenticated } = useAuthStore()
  const location = useLocation()
  const path = location.pathname

  return (
    <div className="w-full ">
      {(isAuthenticated) && (
        <div className="flex justify-between p-5 bg-white w-full">
          <div className="min-w-48">
            <img src={logoIcon} />
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button
                size="sm"
                className="gap-2 cursor-pointer transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                variant={ path === "/" ? "primary" : "default" }
              >
                Dashboard
              </Button>
            </Link>
            <Link to="/transactions">
              <Button
                size="sm"
                className="gap-2 cursor-pointer transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                variant={ path === "/transactions" ? "primary" : "default" }
              >
                Transações
              </Button>
            </Link>
            <Link to="/categories">
              <Button
                size="sm"
                className="gap-2 cursor-pointer transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                variant={ path === "/categories" ? "primary" : "default" }
              >
                Categorias
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Link to="/my-account">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gray-400 text-xl text-black ">
                    {user?.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
              
            </div>            
          </div>
        </div>
      )}
    </div>
  )
}