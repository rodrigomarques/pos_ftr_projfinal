import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { TransactionModel } from '@/models/transaction.model'
import { CreateTransactionInput, UpdateTransactionInput } from '@/dtos/input/transaction'
import { TransactionService } from '@/services/transaction.service'
import { GraphqlContext } from '@/graphql/context'
import { IsAuth } from '@/middlewares/auth.middleware'

@Resolver(() => TransactionModel)
@UseMiddleware(IsAuth)
export class TransactionResolver {
  private transactionService = new TransactionService()
  
  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput,
    @Ctx() ctx: GraphqlContext,
  ) {
    return await this.transactionService.createTransaction(data, ctx.user)
  }

  @Query(() => [TransactionModel])
  async listTransactions(@Ctx() ctx: GraphqlContext): Promise<TransactionModel[]> {
    return await this.transactionService.listTransactions(ctx.user)
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg('id', () => String) id: string, 
    @Ctx() ctx: GraphqlContext
  ): Promise<boolean> {
      return await this.transactionService.deleteTransaction(id, ctx.user) != null
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg('data', () => UpdateTransactionInput) data: UpdateTransactionInput,
    @Ctx() ctx: GraphqlContext
  ) {
    return await this.transactionService.updateTransaction(data, ctx.user)
  }
}