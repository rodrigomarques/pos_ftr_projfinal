import { gql } from "@apollo/client"

export const LIST_TRANSACTIONS = gql`
  query listTransactions(
    $filters: TransactionFilterInput
    $pagination: PaginationInput
  ) {
    listTransactions(filters: $filters, pagination: $pagination) {
      data {
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
      total
      page
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
`

export const LIST_TRANSACTIONS_DASH = gql`
  query listTransactions($filters: TransactionFilterInput) {
    listTransactions(filters: $filters) {
      data {
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
  }
`
