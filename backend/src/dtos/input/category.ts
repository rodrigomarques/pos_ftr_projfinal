import { TransactionType } from '@generated/prisma/enums'
import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  name!: string

  @Field(() => String)
  color!: string

  @Field(() => TransactionType, { nullable: false })
  type!: TransactionType
}

@InputType()
export class UpdateCategoryInput {
  @Field(() => String)
  id!: string

  @Field(() => String)
  name!: string

  @Field(() => String)
  color!: string

  @Field(() => TransactionType, { nullable: false })
  type!: TransactionType
}