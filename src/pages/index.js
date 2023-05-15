
import Home from '../components/screens/home/home'
import { GET_ALL_POSTS, GET_HOME, GET_SERVER_POSTS, } from '../queries/get_queries'
import { client } from '../apollo/apollo'
import { Inter } from 'next/font/google'
import Head from 'next/head'
const inter = Inter({ subsets: ['latin'] })
export default function HomePage(props) {
  return (
    <div className={inter.className}>
            <Head>
      <link rel="shortcut icon" href="../../public/favicon.ico" />
      </Head>
      <Home getMain={props.getMain} getAll={props.getAllPosts} serverposts={props.getServerPosts}/>
    </div>
  )
}
export async function getStaticProps() {
  const getAllPosts = await client.query({
    query: GET_ALL_POSTS
  }),
    getMain = await client.query({
      query: GET_HOME
    }),
    getServerPosts = await client.query({
      query: GET_SERVER_POSTS
    })
  return {
    props: {
      getAllPosts,
      getMain,
      getServerPosts
    },
    revalidate: 60
  };
}