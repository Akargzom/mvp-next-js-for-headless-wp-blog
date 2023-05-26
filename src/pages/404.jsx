import Image from "next/image"
import { GET_MENU_FOOTER, GET_MENU_HEADER } from '../queries/get_queries'
import { client } from '../apollo/apollo'
import Header from "../components/layout/header/header"
import Footer from "../components/layout/Footer/footer"
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
 export default function Custom404(props) {
return(
        <div className={inter.className}>
        <Header getHead={props?.getHead}/>
        <div className="container">
        <Image className="notFound" src='/404.png' alt="404" width={500} height={500}/>
        </div>
        <Footer getFoot={props?.getFoot}/>
        </div>
)
}
export async function getStaticProps() {
          const getHead = await client.query({
            query: GET_MENU_HEADER
          }),
          getFoot = await client.query({
            query: GET_MENU_FOOTER
          })
        return {
          props: {
            getHead,
            getFoot
          },
          revalidate: 60
        };
      }