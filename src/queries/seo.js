import { gql } from "@apollo/client"
import seoFragment from "./fragments/seo-fragment";
export const MAIN_SEO = gql ` {
    pageBy(uri:"/") {
      id
      title
      content
      uri
      seo{
          ...SeoFragment
      }
    }
  }
  ${seoFragment}
  `
  ;