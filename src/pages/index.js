
import { useQuery } from '@apollo/client';
import Home from '../components/screens/home/home'
import { GET_ALL_POSTS, GET_MENU_FOOTER, GET_MENU_HEADER, getPage, getPost, getPosts } from '../queries/get_queries'
import { client } from '../apollo/apollo'

export default function HomePage(props) {
  return (
    <>
    <Home getAll={props.getAll}/>
    </>
  )
}
export async function getStaticProps() {
const getAll= await client.query({
  query: GET_ALL_POSTS
})
  return { props: { 
     getAll,
   },
   revalidate: 60 };
}