import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { TransactionModel } from '@/models/transaction.model'
import { CreateTransactionInput } from '@/dtos/input/transaction'
import { TransactionService } from '@/services/transaction.service'

@Resolver(() => TransactionModel)
export class TransactionResolver {
  private transactionService = new TransactionService()
  
  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg('data', () => CreateTransactionInput) data: CreateTransactionInput
  ) {
    return await this.transactionService.createTransaction(data)
  }

  @Query(() => [TransactionModel])
  async listTransactions(): Promise<TransactionModel[]> {
    return await this.transactionService.listTransactions()
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg('id', () => String) id: string
  ): Promise<boolean> {
      return await this.transactionService.deleteTransaction(id) != null
  }
}