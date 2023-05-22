import c from './header.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { sanitize } from '../../../utils/sanitize'
const Header = (props) => {
      const menuItems = props?.getHead
      if(!menuItems){
        return null
    }
    const src = menuItems.data && menuItems.data.getHeader.siteLogoUrl ? menuItems.data.getHeader.siteLogoUrl : ''
    return (
        <header id={c.header}>
            {menuItems.data && menuItems.data.getHeader.siteLogoUrl && <Link href={'/'}><Image alt={menuItems.data.getHeader.siteTitle} loader={() => src} src={src}  className={c.img} height={500} width={500}/></Link>}
        <ul  className={c.menu}>
            {
                menuItems.data && menuItems.data.menuItems.nodes.length &&
                menuItems.data.menuItems.nodes.map(
                    k => <li key={k.id} className={k.cssClasses ? '' + k.cssClasses.map(c => c) + ' menuItem' : 'menuItem'}>
                        <Link  href={k.url.replace('https://raduga.anebopro.com/wordpress/', '') ? k.url.replace('https://raduga.anebopro.com/wordpress/', '') : '/'} dangerouslySetInnerHTML={{ __html: sanitize(k.label) }}></Link>
                        {
                            k.childItems.edges.length ?
                                <ul className="submenu">
                                    {
                                        k.childItems.edges.map(el => <li className={el.node.cssClasses ? '' + el.node.cssClasses.map(c => c) + ' childMenuItem' : 'childMenuItem'} key={el.node.id}>
                                            <Link  href={el.node.url.replace('https://raduga.anebopro.com/wordpress/', '')} dangerouslySetInnerHTML={{ __html: sanitize(el.node.label) }}></Link>
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