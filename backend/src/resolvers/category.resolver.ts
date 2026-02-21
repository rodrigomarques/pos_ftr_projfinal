import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { CategoryModel } from '@/models/category.model'
import { CreateCategoryInput, UpdateCategoryInput } from '@/dtos/input/category'
import { CategoryService } from '@/services/category.service'
import { GraphqlContext } from '@/graphql/context'
import { IsAuth } from '@/middlewares/auth.middleware'

@Resolver(() => CategoryModel)
@UseMiddleware(IsAuth)
export class CategoryResolver {
  private categoryService = new CategoryService()
  
  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg('data', () => CreateCategoryInput) data: CreateCategoryInput,
    @Ctx() ctx: GraphqlContext,
  ) {
    return await this.categoryService.createCategory(data, ctx.user)
  }

  @Query(() => [CategoryModel])
  async listCategories(@Ctx() ctx: GraphqlContext,): Promise<CategoryModel[]> {
    console.log(ctx.user)
    return await this.categoryService.listCategories(ctx.user)
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg('id', () => String) id: string,
    @Ctx() ctx: GraphqlContext,
  ): Promise<boolean> {
      return await this.categoryService.deleteCategory(id, ctx.user) != null
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg('data', () => UpdateCategoryInput) data: UpdateCategoryInput,
    @Ctx() ctx: GraphqlContext,
  ) {
    return await this.categoryService.updateCategory(data, ctx.user)
  }

}