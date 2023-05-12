import c from './post.module.css'
import { useEffect, useState } from "react"
import Image from 'next/image'
import { getPost } from '../../queries/get_queries'
import { usePathname } from 'next/navigation'
import Seo from '../../components/seo/seo'
import Head from 'next/head'
import parse from 'html-react-parser'
const Post = () => {
    let path = usePathname()
    const [post, setPost] = useState(null)
    useEffect(() => {
        if (path) {
            getPost(path.substring(6)).then(r => setPost(r))
        }
    }, [path])
    const src = post && post.data && post.data.post && post.data.post.featuredImage ? `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/${post.data.post.featuredImage.node.uri}` : '';
    return (
        <>
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
            <div>
                {post && post.data && post.data.post && post.data.post.featuredImage && <Image loader={() => src} src={src} className={c.img} height={500} width={500} alt={post.data.post.featuredImage.node.altText} />}
                {post && post.data && post.data.post && <h1>{post.data.post.title}</h1>}
                {post && post.data && post.data.post && <div dangerouslySetInnerHTML={{ __html: post.data.post.content }}></div>}
                {post && post.data && post.data.post && <div > {post.data.post.date}</div>}
            </div>
        </>
    )
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