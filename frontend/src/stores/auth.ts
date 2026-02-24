import { create } from "zustand"
import { persist } from "zustand/middleware"
import { apolloClient } from "@/lib/graphql/apollo"
import type { User ,RegisterInput, LoginInput} from '@/types'


interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  signup: (data: RegisterInput) => Promise<boolean>
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
        signup: async (registerData: RegisterInput) => {
          console.log("Signup data:", registerData)
          return false
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