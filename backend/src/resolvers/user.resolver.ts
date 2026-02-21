import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { UserModel } from '../models/user.model'
import { UserService } from '@/services/user.service'
import { CreateUserInput } from '@/dtos/input/user'

@Resolver(() => UserModel)
export class UserResolver {
  private userService = new UserService()
  
  @Mutation(() => UserModel)
  async createUser(
    @Arg('data', () => CreateUserInput) data: CreateUserInput
  ) {
    return this.userService.createUser(data)
  }

  @Query(() => UserModel)
  async getUser(@Arg('id', () => String) id: string): Promise<UserModel> {
    return this.userService.findUser(id)
  }

  @Query(() => [UserModel])
  async listUsers(): Promise<UserModel[]> {
    return this.userService.listUsers()
  }
}