
import Home from '../components/screens/home/home'
import { GET_ALL_POSTS, GET_HOME, GET_MENU_FOOTER, GET_MENU_HEADER, GET_SERVER_POSTS, } from '../queries/get_queries'
import { client } from '../apollo/apollo'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Layout from '../components/layout/layout'
const inter = Inter({ subsets: ['latin'] })
export default function HomePage(props) {
  return (
    <Layout props={props}>
      <div className={inter.className}>
        <Home getMain={props.getMain} getAll={props.getAllPosts} serverposts={props.getServerPosts} />
      </div>
    </Layout>
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
    }),
    getHead = await client.query({
      query: GET_MENU_HEADER
    }),
    getFoot = await client.query({
      query: GET_MENU_FOOTER
    })
  return {
    props: {
      getAllPosts,
      getMain,
      getServerPosts,
      getHead,
      getFoot
    },
    revalidate: 60
  };
}