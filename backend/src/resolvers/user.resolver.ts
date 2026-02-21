import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { UserModel } from '../models/user.model'
import { UserService } from '@/services/user.service'
import { CreateUserInput } from '@/dtos/input/user'
import { IsAuth } from '@/middlewares/auth.middleware'
import { UserOutput } from '@/dtos/output/user'

@Resolver(() => UserModel)
export class UserResolver {
  private userService = new UserService()
  
  @Mutation(() => UserOutput)
  async createUser(
    @Arg('data', () => CreateUserInput) data: CreateUserInput
  ) {
    return this.userService.createUser(data)
  }

  @Query(() => UserOutput)
  @UseMiddleware(IsAuth)
  async getUser(
    @Arg('id', () => String) id: string
  ): Promise<UserOutput> {
    return this.userService.findUser(id)
  }
  
  @Query(() => [UserOutput])
  @UseMiddleware(IsAuth)
  async listUsers(): Promise<UserOutput[]> {
    return this.userService.listUsers()
  }
}