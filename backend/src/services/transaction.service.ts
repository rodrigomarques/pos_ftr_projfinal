import { CreateTransactionInput, TransactionFilterInput, UpdateTransactionInput } from '@/dtos/input/transaction'
import { prismaClient } from '../../prisma/prisma'
import { Prisma } from "@generated/prisma/client"

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

  async listTransactions(userId: string, filters?: TransactionFilterInput) {

    let startDate: Date | undefined
    let endDate: Date | undefined

    if (filters?.period) {
      const [month, year] = filters.period.split("/").map(Number)

      startDate = new Date(year, month - 1, 1)
      endDate = new Date(year, month, 0, 23, 59, 59)
    }

    return prismaClient.transaction.findMany({
      where: {
        userId,

        ...(filters?.description && {
          title: {
            contains: filters.description,
          }
        }),

        ...(filters?.type && {
          type: filters.type
        }),

        ...(filters?.categoryId && {
          categoryId: filters.categoryId
        }),

        ...(startDate && {
          date: {
            gte: startDate,
            lte: endDate
          }
        })
      },

      include: {
        category: true
      },

      orderBy: {
        date: "desc"
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