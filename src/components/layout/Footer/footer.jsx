import c from './footer.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { sanitize } from '../../../utils/sanitize'
const Footer = (props) => {
    const menuItems = props?.getFoot
    if(!menuItems){
        return null
    }
    const src = menuItems.data && menuItems.data.getHeader.siteLogoUrl ? menuItems.data.getHeader.siteLogoUrl : ''
    return (
        <footer id={c.footer}>
           {menuItems.data && menuItems.data.getHeader.siteLogoUrl && <Link href={'/'}><Image alt={menuItems.data.getHeader.siteTitle} loader={() => src} src={src}  className={c.img} height={500} width={500}/></Link>}
        <ul className={c.menu + ' headMenu'}>
            {
                menuItems.data && menuItems.data.menuItems.nodes.length &&
                menuItems.data.menuItems.nodes.map(
                    k => <li key={k.id} className={k.cssClasses ? '' + k.cssClasses.map(c => c) + ' menuItem' : 'menuItem'}>
                        <Link  href={k.url.replace('https://raduga.anebopro.com/wordpress/', '').replace('http://raduga.anebopro.com/wordpress/', '/') ?
                        k.url.replace('https://raduga.anebopro.com/wordpress/', '/').replace('http://raduga.anebopro.com/wordpress/', '/') 
                        : '/'} dangerouslySetInnerHTML={{ __html: sanitize(k.label) }}></Link>
                    </li>
                )
            }
            <li className={c.copy}>{menuItems.data.getFooter.copyrightText}</li>
        </ul>
        </footer>
    )
}
export default Footer