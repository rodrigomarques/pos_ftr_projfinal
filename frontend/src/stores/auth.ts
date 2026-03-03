import { create } from "zustand"
import { persist } from "zustand/middleware"
import { apolloClient } from "@/lib/graphql/apollo"
import type { User ,LoginInput, CreateUserInput} from '@/types'
import { CREATE_USER } from "@/lib/graphql/mutations/Register"

type RegisterMutationData = {
  createUser: {
    id: string
		name: string
		email: string
    createdAt: string
  }
}
interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  signup: (data: CreateUserInput) => Promise<boolean>
  login: (data: LoginInput) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>() (
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        login: async (loginData: LoginInput) => {
          console.log("Login data:", loginData)
          return false
        },
        signup: async (registerData: CreateUserInput) => {
          try{
              const { data } = await apolloClient.mutate<
              RegisterMutationData,
                {data: CreateUserInput}
              >({
                mutation: CREATE_USER,
                variables: {
                  data: {
                      name: registerData.name,
                      email: registerData.email,
                      password: registerData.password
                  }
                }
              })
              if(data?.createUser){
                const { id, name, email, createdAt } = data.createUser
                console.log("User created:", { id, name, email, createdAt })
                return true
              }
              return false
          }catch(error){
            console.log("Erro ao fazer o cadastro", error)
            throw error
          }
        },
        logout: () => {
          set({
            user:null,
            token: null,
            isAuthenticated: false
          })
          apolloClient.clearStore()
        },
      }),
      {
        name: 'auth-storage'
      }
    )
)