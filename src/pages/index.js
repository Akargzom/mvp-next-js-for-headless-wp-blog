
import Home from '../components/screens/home/home'
import { GET_ALL_POSTS, GET_HOME, } from '../queries/get_queries'
import { client } from '../apollo/apollo'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
export default function HomePage(props) {
  return (
    <div className={inter.className}>
      <Home getMain={props.getMain} getAll={props.getAllPosts} />
    </div>
  )
}
export async function getStaticProps() {
  const getAllPosts = await client.query({
    query: GET_ALL_POSTS
  }),
    getMain = await client.query({
      query: GET_HOME
    })
  return {
    props: {
      getAllPosts,
      getMain
    },
    revalidate: 60
  };
}