import Image from "next/image"
import Layout from "../components/layout/layout"

 export default function Custom404() {
return(
        <div className="container">
        <Image className="notFound" src='/404.png' alt="404" width={500} height={500}/>
        </div>
)
}