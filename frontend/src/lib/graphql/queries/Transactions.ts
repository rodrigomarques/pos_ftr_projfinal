import { gql } from "@apollo/client"

export const LIST_TRANSACTIONS = gql`
  query listTransactions($filters: TransactionFilterInput) {
    listTransactions(filters: $filters) {
      id
      title
      amount
      type
      date
      categoryId
      category {
        id
        name
        color
        icon
      }
    }
  }
`
