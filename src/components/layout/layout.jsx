import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import Header from './header/header'
import Footer from './Footer/footer'
import Head from 'next/head'
// import dymanic from 'next/dynamic'
// const DynamicFooter = dynamic(()=> import ("./Footer/footer"), {
//     ssr: false
// })
const Layout = ({ children, props }) => {
    return (
        <div className={inter.className}>
            <Head>
                <link rel="shortcut icon" href={props?.getHead?.data?.getHeader.favicon} />
            </Head>
            <Header getHead={props?.getHead} />
            {children}
            <Footer getFoot={props?.getFoot} />
        </div>
    )
}
export default Layout