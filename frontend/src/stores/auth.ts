import { create } from "zustand"
import { persist } from "zustand/middleware"
import { apolloClient } from "@/lib/graphql/apollo"
import type { User ,LoginInput, CreateUserInput, UpdateUserInput} from '@/types'
import { CREATE_USER } from "@/lib/graphql/mutations/users/Register"
import { LOGIN } from "@/lib/graphql/mutations/users/Login"
import { UPDATE_USER } from "@/lib/graphql/mutations/users/Update"

type RegisterMutationData = {
  createUser: {
    id: string
		name: string
		email: string
    createdAt: string
  }
}

type LoginMutationData = {
  login: {
    token: string
    refreshToken: string
    user: User
  }
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  signup: (data: CreateUserInput) => Promise<boolean>
  login: (data: LoginInput) => Promise<boolean>
  update: (data: UpdateUserInput) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>() (
    persist(
      (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        login: async (loginData: LoginInput) => {
          try{
              const {data} = await apolloClient.mutate<LoginMutationData, { data: LoginInput }>({
                mutation: LOGIN,
                variables: {
                  data: {
                    email: loginData.email,
                    password: loginData.password
                  }
                }
              })

              if(data?.login){
                const { user, token } = data.login
                set({
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                  },
                  token,
                  isAuthenticated: true
                })
                return true
              }
              return false
          }catch(error){
            console.log("Erro ao fazer o login")
            throw error
          }
        },
        update: async (updateData: UpdateUserInput) => {
          try{
              const {data} = await apolloClient.mutate<{ updateUser: UpdateUserInput}, { data: UpdateUserInput }>({
                mutation: UPDATE_USER,
                variables: {
                  data: {
                    id: updateData.id,
                    email: updateData.email,
                    name: updateData.name
                  }
                }
              })

              if(data?.updateUser){
                const { name, email } = data.updateUser
                set((state) => ({
                  user: state.user
                    ? {
                        ...state.user,   
                        name,
                        email,
                      }
                    : null,
                }))
                return true
              }
              return false
          }catch(error){
            console.log("Erro ao atualizar o usuário", error)
            throw error
          }
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