import { UserModel } from '../models/user.model'
import { prismaClient } from '../../prisma/prisma'
import { LoginInput } from '../dtos/input/auth.input'
import { comparePassword, hashPassword } from '../utils/hash'
import { signJwt } from '../utils/jwt'

export class AuthService {
  async login(data: LoginInput) {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    })
    if (!existingUser) throw new Error('Usuário não cadastrado!')
    const compare = await comparePassword(data.password, existingUser.password)
    if (!compare) throw new Error('Senha inválida!')
    return this.gerenerateTokens(existingUser)
  }

  gerenerateTokens(user: UserModel) {
    const token = signJwt({ id: user.id, email: user.email }, '1d')
    const refreshToken = signJwt({ id: user.id, email: user.email }, '1d')
    return { token, refreshToken, user }
  }
}