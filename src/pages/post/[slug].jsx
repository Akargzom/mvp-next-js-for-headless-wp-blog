import c from './post.module.css'
import Image from 'next/image'
import { getPost } from '../../queries/get_queries'
import Seo from '../../components/seo/seo'
import Head from 'next/head'
import parse from 'html-react-parser'
import { GET_ALL_POSTS, GET_MENU_FOOTER, GET_MENU_HEADER } from '../../queries/get_queries'
import { client } from '../../apollo/apollo'
import Custom404 from '../404'
import Layout from '../../components/layout/layout'
import { sanitize } from '../../utils/sanitize'
import Header from '../../components/layout/header/header'
import Footer from '../../components/layout/Footer/footer'
const Post = (props) => {
const post = props.post
    if (post?.data?.post) {
        const src = post && post.data && post.data.post && post.data.post.featuredImage ? `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/${post.data.post.featuredImage.node.uri}` : '';
        return (
            <Layout>
                <Header getHead={props?.getHead} />
                <div>
                    <Seo seo={post?.data?.post?.seo} uri={post?.data?.post?.uri} />
                    <Head>
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
                        {post && post.data && post.data.post && post.data.post.featuredImage && <Image className={c.img} loader={() => src} src={src} height={500} width={500} alt={post.data.post.featuredImage.node.altText} />}
                        {post && post.data && post.data.post && <h1 className={c.title}>{post.data.post.title}</h1>}
                        {post && post.data && post.data.post && <div className={c.content} dangerouslySetInnerHTML={{ __html: sanitize(post.data.post.content) }}></div>}
                        {post && post.data && post.data.post && <div className={c.date}> {post.data.post.date.substring(0, post.data.post.date.length - 9)}</div>}
                    </div>
                </div>
                <Footer getFoot={props?.getFoot} />
            </Layout>
        )
    }
    else {
        return (<Layout>
            <Header getHead={props?.getHead} />
            <Custom404 />
            <Footer getFoot={props?.getFoot} />
        </Layout>)
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

export async function getServerSideProps(context) {
    let post
    await getPost(context.params.slug).then(r => post = r)
    const getHead = await client.query({
        query: GET_MENU_HEADER
    }),
        getFoot = await client.query({
            query: GET_MENU_FOOTER
        })
    return {
        props: {
            post: post,
            getFoot: getFoot,
            getHead: getHead,
        }
    };
}
