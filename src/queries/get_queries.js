import { gql } from "@apollo/client"
import menuFragment from "./fragments/menus"
import { client } from "../apollo/apollo"
import seoFragment from "./fragments/seo-fragment"
export const getPosts = async (page) => {
  const GET_POSTS = gql`
{
  posts(where: {offsetPagination: {size: ${page}, offset: null}}) {
      nodes {
        title
        date
        postId
        slug
        content
        featuredImage {
          node {
            altText
            uri
          }
        }
    }
    
  }
}
`
    ;
  return await client.query({
    query: GET_POSTS
  })
}
export const GET_SERVER_POSTS = gql`
{
  posts{
      nodes {
        title
        date
        postId
        slug
        content
        featuredImage {
          node {
            altText
            uri
          }
        }
    }
    
  }
}
`

export async function getPage(slug) {
  const GET_SINGLE_PAGE = gql`
    {
      page(id: "https://raduga.anebopro.com/wordpress/${slug}", idType: URI) {
        title
        content
        slug
        uri
        featuredImage {
          node {
            altText
            uri
          }
          
        }
        seo{
          ...SeoFragment
      }
      }
    }
    ${seoFragment}
  `
    ;
  try {
    return await client.query({
      query: GET_SINGLE_PAGE
    })
  } catch {
    console.log('apollo error')
  }
}
export async function getPost(slug) {
  const GET_SINGLE_POSTS = gql`
    {
      post(id: "${slug}", idType: SLUG) {
        author {
          node {
            firstName
          }
        }
        featuredImage {
         node {
           altText
           uri
         }
       }
        content
        title
        date
        slug
        uri
        seo{
          ...SeoFragment
      }
      }
    }
    ${seoFragment}
    `
    ;
  try {
    return await client.query({
      query: GET_SINGLE_POSTS
    })
  } catch {
    console.log('apollo error')
  }
}
export const GET_MENU_HEADER = gql`
  {
    getHeader {
      siteLogoUrl
      siteTitle
        favicon
    }
    menuItems(where: {location: HCMS_MENU_HEADER, parentId: ""}) {
      nodes {
        ...menuFragment
        childItems {
          edges {
            node {
              ...menuFragment
              childItems {
                nodes{
                  ...menuFragment
                }
              }
            }
          }
        }
      }
    }
  }  
  ${menuFragment}
  `
  ;

export const GET_ALL_PAGES = gql`
  {
    pages {
      nodes {
        pageId
        slug
      }
    }
  }`
  ;
export const GET_MENU_FOOTER = gql`
  {
    getHeader {
      siteLogoUrl
      siteTitle
    }
    getFooter {
      copyrightText
    }
    menuItems(where: {location: HCMS_MENU_FOOTER, parentId: ""}) {
      nodes {
        ...menuFragment
        childItems {
          edges {
            node {
              ...menuFragment
              childItems {
                nodes{
                  ...menuFragment
                }
              }
            }
          }
        }
      }
    }
  }  
  ${menuFragment}
  `
  ;
export const GET_ALL_POSTS = gql`
        {
          posts{
              nodes {
                postId
                slug
            }
          }
        }
      `
  ;

export const GET_HOME = gql`
  {
    pageBy(uri: "/") {
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
  export const GET_PAGE_BY_ID = gql`
	query GET_PAGE_BY_ID($id: ID!) {
	  page(idType: DATABASE_ID, id: $id) {
	    id
	    title
	    content
	    slug
	    uri
	    seo {
          ...SeoFragment
        }
		status
	  }
	}
  ${seoFragment}
`;