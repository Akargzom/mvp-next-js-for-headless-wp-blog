'use client'
import c from './single_page.module.css'
import Image from 'next/image'
import Header from '../components/layout/header/header'
import Footer from '../components/layout/Footer/footer'
import { GET_ALL_PAGES, getPage } from '../queries/get_queries'
import Head from 'next/head'
import Seo from '../components/seo/seo'
import parse from 'html-react-parser'
import { client } from '../apollo/apollo'
import Custom404 from './404'
import Layout from '../components/layout/layout'
import { sanitize } from '../utils/sanitize'
import { GET_MENU_FOOTER, GET_MENU_HEADER } from '../queries/get_queries'
const SinglePage = (props) => {
    const page = props.page
    if (page?.data?.page) {
        const src = page && page.data && page.data.page && page.data.page.featuredImage ? `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/${page.data.page.featuredImage.node.uri}` : '';
        return (
            <Layout>
                <Header getHead={props?.getHead} />
                <div>
                    <Seo seo={page?.data?.page?.seo} uri={page?.data?.page?.uri} />
                    <Head>
                        {page?.data?.page?.schemaDetails && (
                            <script
                                type='application/ld+json'
                                className='yoast-schema-graph'
                                key='yoastSchema'
                                dangerouslySetInnerHTML={{ __html: parse(page?.data?.page?.schemaDetails) }}
                            />
                        )}
                    </Head>
                    <div className='container'>
                        {page && page.data.page && page.data.page.featuredImage && <Image loader={() => src} src={src} className={c.img} height={500} width={500} alt={page.data.page.featuredImage.node.altText} />}
                        <h1 className={c.title}>{page && page.data.page && page.data.page.title}</h1>
                        <div className={c.content} dangerouslySetInnerHTML={page && page.data.page && { __html: sanitize(page.data.page.content) }}></div>
                    </div>
                </div>
                <Footer getFoot={props?.getFoot} />
            </Layout>
        )
    } else {
        return (<Layout>
            <Header getHead={props?.getHead} />
            <Custom404 />
            <Footer getFoot={props?.getFoot} />
        </Layout>)
    }
}
export default SinglePage
export const getStaticPath = async () => {
    getAll = await client.query({
        query: GET_ALL_PAGES
    })
    const path = getAll.data.pages.nodes.map(el => ({
        params: { slug: el.slug }
    }))
    return {
        path,
        fallback: 'blocking'
    }
}

export async function getServerSideProps(context) {
    let page
    await getPage(context.params.slug).then(r => page = r)
    const getHead = await client.query({
        query: GET_MENU_HEADER
    }),
        getFoot = await client.query({
            query: GET_MENU_FOOTER
        })
    return {
        props: {
            page: page,
            getFoot: getFoot,
            getHead: getHead,
        }
    };
}


