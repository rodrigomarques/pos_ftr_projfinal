import { hashPassword } from '@/utils/hash'
import { prismaClient } from '../../prisma/prisma'
import { CreateUserInput } from '@/dtos/input/user'

export class UserService {
    
  async createUser(data: CreateUserInput) {
    const findUser = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    })
    if (findUser) throw new Error('Usuário já cadastrado!')
      
    const hash = await hashPassword(data.password)
    return prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash,
      },
    })
  }
    
  async findUser(id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    })
    if (!user) throw new Error('Usuário não existe')
    return user
  }

  async listUsers() {
    return prismaClient.user.findMany()
  }
}