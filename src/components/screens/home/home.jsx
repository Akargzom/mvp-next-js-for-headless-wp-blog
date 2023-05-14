'useClient'
import Head from 'next/head'
import c from './Home.module.css'
import Layout from '../../layout/layout'
import { getPosts } from '../../../queries/get_queries'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Seo from '../../seo/seo'
import parse from 'html-react-parser'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
const Home = (props) => {
    const [page, setPage] = useState(6),
        [posts, setPosts] = useState(() => getPosts(page)),
        loadMore = () => {
            setPage(prev => prev + 6)
        }
    useEffect(() => {
        getPosts(page).then(r => { r && setPosts(r) })
    }, [page])
    return (
        <Layout>
            <Seo seo={props.getMain?.data?.pageBy?.seo} uri={props.getMain.data?.pageBy?.uri} />
            <Head>
                <link rel="shortcut icon" href='../../../../public/favicon.ico' />
                {props.getMain.data?.pageBy?.seo.schemaDetails && (
                    <script
                        type='application/ld+json'
                        className='yoast-schema-graph'
                        key='yoastSchema'
                        dangerouslySetInnerHTML={{ __html: parse(props.getMain.data.pageBy.seo.schemaDetails) }}
                    />
                )}
            </Head>
            <main className={inter.className}>
                <div className="container">
                    {posts.data && posts.data.posts.nodes.map(p => {
                        return (
                            <Link className={c.wrap} key={p.postId} href={'post/' + p.slug}>
                                 {p.featuredImage && <div style={{backgroundImage: 'url('+ process.env.NEXT_PUBLIC_WORDPRESS_API_URL+'/'+p.featuredImage.node.uri+')'}} className={c.img}></div>}
                                <div className={c.info}>
                                <h2 className={c.title}>{p.title}</h2>
                                <div className={c.exc}>{p.content && p.content.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 150).split(" ").reverse().slice(1).reverse().join(" ") + '...'}</div>
                                <div className={c.date}> {p.date.substring(0, p.date.length - 9)}</div>
                                </div>
                            </Link>
                        )
                    })}
                    {props.getAll.data && props.getAll.data.posts.nodes.length > 6 && posts.data && posts.data.posts.nodes.length < props.getAll.data.posts.nodes.length &&
                        <div onClick={loadMore} className={c.loadMore}>Load More</div>}
                </div>

            </main>
        </Layout>
    )
}
export default Home