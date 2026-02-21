import { Field, GraphQLISODateTime, ID, ObjectType, registerEnumType } from 'type-graphql'
import { UserModel } from './user.model'
import { TransactionModel } from './transaction.model'

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  name!: string

  @Field(() => String)
  color!: string

  @Field(() => String, { nullable: false })
  type!: string

  @Field(() => String)
  userId!: string

  @Field(() => UserModel, { nullable: true })
  user?: UserModel

  @Field(() => [TransactionModel], { nullable: true })
  transactions?: TransactionModel[]

  @Field(() => GraphQLISODateTime)
  createdAt!: Date

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date
}