import { gql } from "@apollo/client"

export const CREATE_CATEGORY = gql`
  mutation createCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      id
      name
      color
      icon
    }
  }
`