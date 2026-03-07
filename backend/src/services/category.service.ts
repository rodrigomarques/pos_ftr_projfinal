import { CategoryModel } from '@generated/prisma/internal/prismaNamespaceBrowser'
import { prismaClient } from '../../prisma/prisma'
import { CreateCategoryInput, UpdateCategoryInput } from '@/dtos/input/category'

export class CategoryService {

  async createCategory(data: CreateCategoryInput, userId: string) {
    const findCategory = await prismaClient.category.findFirst({
      where: {
        name: data.name,
        userId: userId
      },
    })
    if (findCategory) throw new Error('Categoria já cadastrada!')
      
    return prismaClient.category.create({
      data: {
        name: data.name,
        color: data.color,
        description: data.description,
        icon: data.icon,
        userId: userId
      },
    })
  }

  async updateCategory(data: UpdateCategoryInput, userId: string) {
    return prismaClient.category.update({
      where: {
        id: data.id,
        userId: userId
      },
      data: {
        name: data.name,
        color: data.color,
        description: data.description,
        icon: data.icon
      }
    })
  }

  async findCategory(id: string, userId: string) {
    const category = await prismaClient.category.findUnique({
      where: {
        id,
        userId: userId
      },
    })
    if (!category) throw new Error('Categoria não existe')
    return category
  }

  async listCategories(userId: string, withStats = false): Promise<CategoryModel[]> {
    const categories = await prismaClient.category.findMany({
      where: { userId },
      ...(withStats && {
        include: {
          _count: {
            select: { transactions: true }
          },
          transactions: {
            select: {
              amount: true,
              type: true
            }
          }
        }
      })
    })

    return categories.map((category: any) => {
      let totalTransactions: number | undefined
      let sumTransactions: number | undefined

      if (withStats) {
        totalTransactions = category._count.transactions

        sumTransactions = category.transactions.reduce((acc: number, t: any) => {
          const value = Number(t.amount)
          return t.type === "INCOME" ? acc + value : acc - value
        }, 0)
      }   

      const { transactions, _count, ...rest } = category

      return {
        ...rest,
        totalTransactions,
        sumTransactions
      }
    })
  }

  async deleteCategory(id: string, userId: string) {
    const category = await prismaClient.category.findUnique({
      where: {
        id,
        userId: userId
      },
    })
    if (!category) return null
    return prismaClient.category.delete({
      where: {
        id,
        userId: userId
      },
    })
  }
}