import { gql } from "@apollo/client"


export const LIST_TRANSACTIONS = gql`
    query listTransactions {
      listTransactions {
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
