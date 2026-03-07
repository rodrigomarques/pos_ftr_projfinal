import { gql } from "@apollo/client"

export const CREATE_TRANSACTION = gql`
  mutation createTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
      id
      title
      amount
      type
      date
    }
  }
`

export const DELETE_TRANSACTION = gql`
  mutation deleteTransaction($id: String!){
    deleteTransaction(id: $id)
  }
`

export const UPDATE_TRANSACTION = gql`
  mutation updateTransaction($data: UpdateTransactionInput!) {
    updateTransaction(data: $data) {
      id
    }
  }
`