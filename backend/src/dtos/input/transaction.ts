//import { Prisma } from '@generated/prisma/browser'
import { Prisma, TransactionType } from '@generated/prisma/client'
import { Field, GraphQLISODateTime, InputType } from 'type-graphql'
import { GraphQLDecimal } from 'prisma-graphql-type-decimal'

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  title!: string

  @Field(() => GraphQLDecimal)
  amount!: Prisma.Decimal

  @Field(() => GraphQLISODateTime)
  date!: Date

  @Field(() => String)
  categoryId!: string

  @Field(() => TransactionType)
  type!: TransactionType
}