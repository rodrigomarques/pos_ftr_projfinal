import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { TransactionModel } from '@/models/transaction.model'
import { CreateTransactionInput, TransactionFilterInput, UpdateTransactionInput } from '@/dtos/input/transaction'
import { TransactionService } from '@/services/transaction.service'
import { GraphqlContext } from '@/graphql/context'
import { IsAuth } from '@/middlewares/auth.middleware'
import { PaginationInput } from '@/dtos/input/pagination'
import { TransactionPagination } from '@/dtos/output/transaction'

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

  @Query(() => TransactionPagination)
  async listTransactions(
    @Ctx() ctx: GraphqlContext,
    @Arg("filters", () => TransactionFilterInput, { nullable: true })
    filters?: TransactionFilterInput,
    @Arg("pagination", () => PaginationInput, { nullable: true })
    pagination?: PaginationInput
  ): Promise<TransactionPagination> {
    return this.transactionService.listTransactions(ctx.user, filters, pagination)
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