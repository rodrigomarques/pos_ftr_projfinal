import { Field, GraphQLISODateTime, ID, ObjectType, registerEnumType } from 'type-graphql'
import { UserModel } from './user.model'
import { CategoryModel } from './category.model'
import { Prisma, TransactionType } from '@generated/prisma/client'

/*
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}
*/
registerEnumType(TransactionType, {
  name: 'TransactionType',
})

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  title!: string

  @Field(() => String)
  amount!: Prisma.Decimal

  @Field(() => TransactionType)
  type!: TransactionType

  @Field(() => GraphQLISODateTime)
  date!: Date

  @Field(() => String)
  userId!: string

  @Field(() => UserModel, { nullable: true })
  user?: UserModel

  @Field(() => String)
  categoryId!: string

  @Field(() => CategoryModel, { nullable: true })
  category?: CategoryModel

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}