import c from './header.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { GET_MENU_HEADER } from '../../../queries/get_queries'
import { client } from '../../../apollo/apollo'
import { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
const Header = () => {
      const [menuItems, setMenuItems] = useState('')
      useEffect(()=>{
          client.query({
              query: GET_MENU_HEADER
            }).then(r => {r && setMenuItems(r)})
      }, [])
    const src = menuItems.data && menuItems.data.getHeader.siteLogoUrl ? menuItems.data.getHeader.siteLogoUrl : ''
    return (
        <header id={c.header} className={inter.className}>
            {menuItems.data && menuItems.data.getHeader.siteLogoUrl && <Image alt={menuItems.data.getHeader.siteTitle} loader={() => src} src={src}  className={c.img} height={500} width={500}/>}
        <ul  className={c.menu}>
            {
                menuItems.data && menuItems.data.menuItems.nodes.length &&
                menuItems.data.menuItems.nodes.map(
                    k => <li key={k.id} className={k.cssClasses ? '' + k.cssClasses.map(c => c) + ' menuItem' : 'menuItem'}>
                        <Link  href={k.url.replace('http://dev11.romanuke.com/wordpress/', '') ? k.url.replace('http://dev11.romanuke.com/wordpress/', '') : '/'} dangerouslySetInnerHTML={{ __html: k.label }}></Link>
                        {
                            k.childItems.edges.length ?
                                <ul>
                                    {
                                        k.childItems.edges.map(el => <li className={el.node.cssClasses ? '' + el.node.cssClasses.map(c => c) + ' childMenuItem' : 'childMenuItem'} key={el.node.id}>
                                            <Link  href={el.node.url.replace('http://dev11.romanuke.com/wordpress/', '')} dangerouslySetInnerHTML={{ __html: el.node.label }}></Link>
                                        </li>)
                                    }
                                </ul>
                                : ''
                        }
                    </li>
                )
            }
        </ul>
        </header>
    )
}
export default Header