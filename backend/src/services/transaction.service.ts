import { CreateTransactionInput } from '@/dtos/input/transaction'
import { prismaClient } from '../../prisma/prisma'

let userId = "ffc6dc5b-9a1b-4e23-83d3-ac12bfbf2204"

export class TransactionService {

  async createTransaction(data: CreateTransactionInput) {
    return await prismaClient.transaction.create({
      data: {
        title: data.title,
        amount: data.amount,
        date: data.date,
        categoryId: data.categoryId,
        type: data.type,
        userId: userId
      },
    })
  }

  async listTransactions() {
    return await prismaClient.transaction.findMany({
      where: {
        userId: userId
      },
      include: { 
        category: true 
      }
    })
  }

  async deleteTransaction(id: string) {
    return await prismaClient.transaction.delete({
      where: {
        id: id
      }
    })
  }
}