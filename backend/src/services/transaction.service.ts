import { CreateTransactionInput, UpdateTransactionInput } from '@/dtos/input/transaction'
import { prismaClient } from '../../prisma/prisma'
export class TransactionService {

  async createTransaction(data: CreateTransactionInput, userId: string) {
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

  async listTransactions(userId: string) {
    return await prismaClient.transaction.findMany({
      where: {
        userId: userId
      },
      include: { 
        category: true 
      }
    })
  }

  async findTransactionById(id: string, userId: string) {
    return await prismaClient.transaction.findUnique({
      where: {
        id: id,
        userId: userId
      },
      include: { 
        category: true 
      }
    })
  }

  async deleteTransaction(id: string, userId: string) {
    return await prismaClient.transaction.delete({
      where: {
        id: id,
        userId: userId
      }
    })
  }

  async updateTransaction(data: UpdateTransactionInput, userId: string) {
    const transaction = await this.findTransactionById(data.id, userId)

    if (!transaction) {
      throw new Error('Transaction not found')
    }

    return await prismaClient.transaction.update({
      where: {
        id: data.id
      },
      data: {
        title: data.title ?? transaction.title,
        amount: data.amount ?? transaction.amount,
        date: data.date ?? transaction.date,
        categoryId: data.categoryId ?? transaction.categoryId,
        type: data.type ?? transaction.type,
      },
    })
  }
}