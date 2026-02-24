import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores/auth"
import logoIcon from "@/assets/logo-icon.svg"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback } from "./ui/avatar"

export function Header() {
  const { user, logout, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  const user2 = {
    name: "John Doe",
    email: "johndue@gmail.com"
  }
  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="w-full ">
      {(isAuthenticated || true) && (
        <div className="flex justify-between p-5 bg-white w-full">
          <div className="min-w-48">
            <img src={logoIcon} />
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button
                size="sm"
                className="gap-2"
                variant={"primary"}
              >
                Dashboard
              </Button>
            </Link>
            <Link to="/">
              <Button
                size="sm"
                className="gap-2"
                variant={"default"}
              >
                Transações
              </Button>
            </Link>
            <Link to="/">
              <Button
                size="sm"
                className="gap-2"
                variant={"default"}
              >
                Categorias
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gray-400 text-xl text-black ">
                  {user2?.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
            </div>            
          </div>
        </div>
      )}
    </div>
  )
}