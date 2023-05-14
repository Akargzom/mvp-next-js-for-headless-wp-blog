import c from './footer.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { GET_MENU_FOOTER } from '../../../queries/get_queries'
import { client } from '../../../apollo/apollo'
import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
const Footer = () => {
    const [menuItems, setMenuItems] = useState('')
    useEffect(()=>{
        client.query({
            query: GET_MENU_FOOTER
          }).then(r => {r && setMenuItems(r)})
    }, [])
    const src = menuItems.data && menuItems.data.getHeader.siteLogoUrl ? menuItems.data.getHeader.siteLogoUrl : ''
    return (
        <footer id={c.footer} className={inter.className}>
           {menuItems.data && menuItems.data.getHeader.siteLogoUrl && <Link href={'/'}><Image alt={menuItems.data.getHeader.siteTitle} loader={() => src} src={src}  className={c.img} height={500} width={500}/></Link>}
        <ul className={c.menu + ' headMenu'}>
            {
                menuItems.data && menuItems.data.menuItems.nodes.length &&
                menuItems.data.menuItems.nodes.map(
                    k => <li key={k.id} className={k.cssClasses ? '' + k.cssClasses.map(c => c) + ' menuItem' : 'menuItem'}>
                        <Link  href={k.url.replace('https://raduga.anebopro.com/wordpress/', '') ? k.url.replace('https://raduga.anebopro.com/wordpress/', '') : '/'} dangerouslySetInnerHTML={{ __html: k.label }}></Link>
                        {
                            k.childItems.edges.length ?
                                <ul>
                                    {
                                        k.childItems.edges.map(el => <li className={el.node.cssClasses ? '' + el.node.cssClasses.map(c => c) + ' childMenuItem' : 'childMenuItem'} key={el.node.id}>
                                            <Link  href={el.node.url.replace('https://raduga.anebopro.com/wordpress/', '')} dangerouslySetInnerHTML={{ __html: el.node.label }}></Link>
                                        </li>)
                                    }
                                </ul>
                                : ''
                        }
                    </li>
                )
            }
        </ul>
        </footer>
    )
}
export default Footer