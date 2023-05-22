import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import Header from './header/header'
import Footer from './Footer/footer'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react';
// import dymanic from 'next/dynamic'
// const DynamicFooter = dynamic(()=> import ("./Footer/footer"), {
//     ssr: false
// })
const Layout = ({ children, props }) => {
    return (
        <div className={inter.className}>
            <Head>
                <meta name="google-site-verification" content="cx60xLTXYmeiSbtQ6BOBpL4_PMwx6-VUmGuwezGgiV4" />
                <link rel="shortcut icon" href={props?.getHead?.data?.getHeader.favicon} />
            </Head>
            <Header getHead={props?.getHead} />
            {children}
            <Analytics />
            <Footer getFoot={props?.getFoot} />
        </div>
    )
}
export default Layout