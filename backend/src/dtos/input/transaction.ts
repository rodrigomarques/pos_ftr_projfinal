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


@InputType()
export class UpdateTransactionInput {
  @Field(() => String)
  id!: string

  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => GraphQLDecimal, { nullable: true })
  amount?: Prisma.Decimal

  @Field(() => GraphQLISODateTime, { nullable: true })
  date? : Date

  @Field(() => String, { nullable: true })
  categoryId?: string

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType
}

@InputType()
export class TransactionFilterInput {

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType

  @Field(() => String, { nullable: true })
  categoryId?: string

  @Field(() => String, { nullable: true })
  period?: string
}