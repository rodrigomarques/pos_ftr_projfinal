import { TransactionModel } from "@/models/transaction.model"
import { Field, Int, ObjectType } from "type-graphql"

@ObjectType()
export class TransactionPagination {

  @Field(() => [TransactionModel])
  data!: TransactionModel[]

  @Field(() => Int)
  total!: number

  @Field(() => Int)
  page!: number

  @Field(() => Int)
  totalPages!: number

  @Field(() => Boolean)
  hasNextPage!: boolean

  @Field(() => Boolean)
  hasPreviousPage!: boolean
}