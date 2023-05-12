
import { useQuery } from '@apollo/client';
import Home from '../components/screens/home/home'
import { GET_ALL_POSTS, GET_HOME, } from '../queries/get_queries'
import { client } from '../apollo/apollo'
import Head from 'next/head'
import Seo from '../components/seo/seo';
export default function HomePage(props) {
  return (
    <>
      <Home getMain={props.getMain} getAll={props.getAll} />
    </>
  )
}
export async function getStaticProps() {
  const getAll = await client.query({
    query: GET_ALL_POSTS
  }),
    getMain = await client.query({
      query: GET_HOME
    })
  return {
    props: {
      getAll,
      getMain
    },
    revalidate: 60
  };
}