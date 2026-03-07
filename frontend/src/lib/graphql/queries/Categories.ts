import { gql } from "@apollo/client"


export const LIST_CATEGORIES = gql`
    query ListCategories {
      listCategories {
        id
        name
        description
        color
        icon
      }
    }
`


export const LIST_CATEGORIES_SELECT = gql`
    query ListCategories {
      listCategories {
        id
        name
      }
    }
`
