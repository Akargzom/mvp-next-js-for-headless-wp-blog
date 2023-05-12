import Head from "next/head"
import Footer from "./Footer/footer"
import Header from "./header/header"
import Seo from "../seo/seo"
// import dymanic from 'next/dynamic'
// const DynamicFooter = dynamic(()=> import ("./Footer/footer"), {
//     ssr: false
// })
const Layout = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}
export default Layout