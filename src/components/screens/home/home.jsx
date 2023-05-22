'useClient'
import Head from 'next/head'
import c from './Home.module.css'
import { getPosts } from '../../../queries/get_queries'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Seo from '../../seo/seo'
import parse from 'html-react-parser'
const Home = (props) => {
    const posts = props.serverposts
    return (
        <div>
            <Seo seo={props.getMain?.data?.pageBy?.seo} uri={props.getMain.data?.pageBy?.uri} />
            <Head>
                {props.getMain.data?.pageBy?.seo.schemaDetails && (
                    <script
                        type='application/ld+json'
                        className='yoast-schema-graph'
                        key='yoastSchema'
                        dangerouslySetInnerHTML={{ __html: parse(props.getMain.data.pageBy.seo.schemaDetails) }}
                    />
                )}
            </Head>
            <main>
                <div className="container">
                    {posts && posts.data ? posts.data.posts.nodes.map(p => {
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
                    }) : props.getServerPosts && props.getServerPosts.data.posts.nodes.map(p => {
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
                    {/* {props.getAll.data && props.getAll.data.posts.nodes.length > 6 && posts.data && posts.data.posts.nodes.length < props.getAll.data.posts.nodes.length &&
                        <div onClick={loadMore} className={c.loadMore}>Load More</div>} */}
                </div>

            </main>
        </div>
    )
}
export default Home