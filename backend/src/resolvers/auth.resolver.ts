import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { LoginInput } from '../dtos/input/auth.input'
import { LoginOutput } from '../dtos/output/auth.output'
import { AuthService } from '../services/auth.service'

@Resolver()
export class AuthResolver {
  private authService = new AuthService()

  @Mutation(() => LoginOutput)
  async login(
    @Arg('data', () => LoginInput) data: LoginInput
  ): Promise<LoginOutput> {
    return this.authService.login(data)
  }
}