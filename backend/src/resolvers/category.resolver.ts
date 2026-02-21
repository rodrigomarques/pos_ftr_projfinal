import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { CategoryModel } from '@/models/category.model'
import { CreateCategoryInput, UpdateCategoryInput } from '@/dtos/input/category'
import { CategoryService } from '@/services/category.service'

@Resolver(() => CategoryModel)
export class CategoryResolver {
  private categoryService = new CategoryService()
  
  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg('data', () => CreateCategoryInput) data: CreateCategoryInput
  ) {
    return await this.categoryService.createCategory(data)
  }

  @Query(() => [CategoryModel])
  async listCategories(): Promise<CategoryModel[]> {
    return await this.categoryService.listCategories()
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg('id', () => String) id: string
  ): Promise<boolean> {
      return await this.categoryService.deleteCategory(id) != null
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg('data', () => UpdateCategoryInput) data: UpdateCategoryInput
  ) {
    return await this.categoryService.updateCategory(data)
  }

}