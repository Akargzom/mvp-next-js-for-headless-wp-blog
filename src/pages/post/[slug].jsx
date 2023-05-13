import c from './post.module.css'
import { useEffect, useState } from "react"
import Image from 'next/image'
import { getPost } from '../../queries/get_queries'
import { usePathname } from 'next/navigation'
import Seo from '../../components/seo/seo'
import Head from 'next/head'
import parse from 'html-react-parser'
import { GET_ALL_POSTS } from '../../queries/get_queries'
import { client } from '../../apollo/apollo'
import Custom404 from '../404'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
const Post = () => {
    let path = usePathname()
    const [temp, setTemp] = useState([]),
        [post, setPost] = useState(null)
    useEffect(() => {
        client.query({
            query: GET_ALL_POSTS
        }).then(r => { r && setTemp(prev => prev = r.data?.posts?.nodes) })
    }, [temp])
    useEffect(() => {
        if (path) {
            getPost(path.substring(6)).then(r => setPost(r))
        }
    }, [path])
    if (temp.filter(el => el.slug == path.substring(6)).length > 0) {
        const src = post && post.data && post.data.post && post.data.post.featuredImage ? `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/${post.data.post.featuredImage.node.uri}` : '';
        return (
            <div className={inter.className}>
                <Seo seo={post?.data?.post?.seo} uri={post?.data?.post?.uri} />
                <Head>
                    <link rel="shortcut icon" href='../../../public/favicon.ico' />
                    {post?.data?.post?.seo.schemaDetails && (
                        <script
                            type='application/ld+json'
                            className='yoast-schema-graph'
                            key='yoastSchema'
                            dangerouslySetInnerHTML={{ __html: parse(post?.data?.post?.seo.schemaDetails) }}
                        />
                    )}
                </Head>
                <div className='container'>
                    {post && post.data && post.data.post && post.data.post.featuredImage && <Image className={c.img} loader={() => src} src={src} className={c.img} height={500} width={500} alt={post.data.post.featuredImage.node.altText} />}
                    {post && post.data && post.data.post && <h1 className={c.title}>{post.data.post.title}</h1>}
                    {post && post.data && post.data.post && <div className={c.content} dangerouslySetInnerHTML={{ __html: post.data.post.content }}></div>}
                    {post && post.data && post.data.post && <div className={c.date}> {post.data.post.date.substring(0, post.data.post.date.length - 9)}</div>}
                </div>
            </div>
        )
    }
    else if
    (path && path != '/' && temp.length>0 && temp.filter(el => '/' + el.slug === path).length === 0){
        return <Custom404 />
    }else{
        return <></>
    }

}
export default Post
export const getStaticPath = async () => {
    getAll = await client.query({
        query: GET_ALL_POSTS
    })
    return {
        path: getAll.data.posts.nodes.map(el => ({
            params: { slug: el.slug },
        }))
    }
}