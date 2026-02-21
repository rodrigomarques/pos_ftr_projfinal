import { prismaClient } from '../../prisma/prisma'
import { CreateCategoryInput, UpdateCategoryInput } from '@/dtos/input/category'

let userId = "ffc6dc5b-9a1b-4e23-83d3-ac12bfbf2204"

export class CategoryService {

  async createCategory(data: CreateCategoryInput) {
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
        type: data.type,
        userId: userId
      },
    })
  }

  async updateCategory(data: UpdateCategoryInput) {
    return prismaClient.category.update({
      where: {
        id: data.id,
        userId: userId
      },
      data: {
        name: data.name,
        color: data.color,
        type: data.type
      }
    })
  }

  async findCategory(id: string) {
    const category = await prismaClient.category.findUnique({
      where: {
        id,
        userId: userId
      },
    })
    if (!category) throw new Error('Categoria não existe')
    return category
  }

  async listCategories() {
    return prismaClient.category.findMany({
      where: {
        userId: userId
      }
    })
  }

  async deleteCategory(id: string) {
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