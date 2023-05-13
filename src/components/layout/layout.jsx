import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
// import dymanic from 'next/dynamic'
// const DynamicFooter = dynamic(()=> import ("./Footer/footer"), {
//     ssr: false
// })
const Layout = ({ children }) => {
    return (
        <div className={inter.className}>
            {children}
        </div>
    )
}
export default Layout