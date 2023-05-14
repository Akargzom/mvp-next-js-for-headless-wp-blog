'use client'
import c from './single_page.module.css'
import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { GET_ALL_PAGES, getPage } from '../queries/get_queries'
import Head from 'next/head'
import Seo from '../components/seo/seo'
import parse from 'html-react-parser'
import { client } from '../apollo/apollo'
import Custom404 from './404'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
const SinglePage = () => {
    let path = usePathname()
    const [temp, setTemp] = useState([]),
    [page, setPage] = useState(null)
    useEffect(() => {
        client.query({
            query: GET_ALL_PAGES
        }).then(r => { r && setTemp(prev => prev = r.data.pages.nodes) })
    }, [temp])
    useEffect(() => {
       path &&  getPage(path.substring(1)).then(r => setPage(r))
    }, [path])
    if (temp.filter(el => '/' + el.slug === path).length > 0) {
        const src = page && page.data && page.data.page && page.data.page.featuredImage ? `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/${page.data.page.featuredImage.node.uri}` : '';
        return (
            <div className={inter.className}>
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
                <div className='container'>
                    {page && page.data.page && page.data.page.featuredImage && <Image loader={() => src} src={src} className={c.img} height={500} width={500} alt={page.data.page.featuredImage.node.altText} />}
                    <h1 className={c.title}>{page && page.data.page && page.data.page.title}</h1>
                    <div className={c.content} dangerouslySetInnerHTML={page && page.data.page && { __html: page.data.page.content }}></div>
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

