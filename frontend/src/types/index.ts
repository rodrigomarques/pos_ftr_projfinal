export interface User {
  id: string
  name: string
  email: string
  createdAt?: string
  updatedAt?: string
}


export interface CreateUserInput {
  name: string
  email: string
  password: string
}


export interface LoginInput {
  email: string
  password: string
}

export interface UpdateUserInput {
  id: string,
  email: string,
  name: string
}

export interface CreateCategoryInput {
  name: string
  color: string
  type: string
  icon?: string
}
