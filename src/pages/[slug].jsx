import c from './single_page.module.css'
import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { GET_ALL_PAGES, getPage } from '../queries/get_queries'
import Head from 'next/head'
import Seo from '../components/seo/seo'
import parse from 'html-react-parser'
const SinglePage = (props) => {
    let path = usePathname()
    const [page, setPage] = useState(null)
    useEffect(() => {
        getPage(path).then(r => setPage(r))
    }, [path])
    const src = page && page.data && page.data.page && page.data.page.featuredImage ? `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/${page.data.page.featuredImage.node.uri}` : '';
    console.log(props)
    return (
        <>
            <Seo seo={page?.data?.page?.seo} uri={page?.data?.page?.uri} />
            <Head>
                <link rel="shortcut icon" href='../../public/favicon.ico' />
                {page?.data?.page?.schemaDetails && (
                    <script
                        type='application/ld+json'
                        className='yoast-schema-graph'
                        key='yoastSchema'
                        dangerouslySetInnerHTML={{ __html: parse(page?.data?.page?.schemaDetails) }}
                    />
                )}
            </Head>
            <div>
                {page && page.data.page && page.data.page.featuredImage && <Image loader={() => src} src={src} className={c.img} height={500} width={500} alt={page.data.page.featuredImage.node.altText} />}
                <h1>{page && page.data.page && page.data.page.title}</h1>
                <div dangerouslySetInnerHTML={page && page.data.page && { __html: page.data.page.content }}></div>
            </div>
        </>

    )
                }
export default SinglePage

export const getStaticPath = async () => {
    getAll = await client.query({
        query: GET_ALL_PAGES
    })
    return {
        path: getAll.data.pages.nodes.map(el => ({
            params: { slug: el.slug }
        }))
    }
}

