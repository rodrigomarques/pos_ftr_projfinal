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

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: String!){
    deleteCategory(id: $id)
  }
`

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($data: UpdateCategoryInput!) {
    updateCategory(data: $data) {
      id
    }
  }
`