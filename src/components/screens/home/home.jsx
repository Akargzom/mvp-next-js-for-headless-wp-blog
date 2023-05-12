'useClient'
import Head from 'next/head'
import c from './Home.module.css'
import Layout from '../../layout/layout'
import { getPosts } from '../../../queries/get_queries'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Seo from '../../seo/seo'
import parse from 'html-react-parser'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })
const Home = (props) =>{
    const [page, setPage] = useState(6),
        [posts, setPosts] = useState(() => getPosts(page)),
        loadMore = () => {
            setPage(prev => prev + 6)
        },
        imageLoader = ({ src }) => {
            return `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/${src}`;
        }
    useEffect(() => {
        getPosts(page).then(r => {r && setPosts(r)})
    }, [page])
    return(
        <Layout>
        <Seo seo={props.getMain.data?.pageBy?.seo} uri={props.getMain.data?.pageBy?.uri}/>
        <Head>
				<link rel="shortcut icon" href='../../../../public/favicon.ico' />
				{props.getMain.data?.pageBy?.seo.schemaDetails && (
					<script
						type='application/ld+json'
						className='yoast-schema-graph'
						key='yoastSchema'
						dangerouslySetInnerHTML={{ __html: parse(props.getMain.data.pageBy.seo.schemaDetails)}}
					/>
				)}
			</Head>
      <main>
      <div>
            {posts.data && posts.data.posts.nodes.map(p => {
                return (
                    <Link key={p.postId} href={'post/'+p.slug}>
                        <h2>{p.title}</h2>
                        {p.featuredImage && <Image loader={imageLoader} src={p.featuredImage.node.uri} className={c.img} height={500} width={500} alt={p.featuredImage.node.altText} />}
                        <div > {p.date}</div>
                    </Link>
                )
            })}
            {props.getAll.data && props.getAll.data.posts.nodes.length > 6 && posts.data && posts.data.posts.nodes.length < props.getAll.data.posts.nodes.length &&
             <div onClick={loadMore} className="loadMore">Load More</div>}
        </div>

      </main>
      </Layout>
    )
}
export default Home