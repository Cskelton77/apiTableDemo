import styles from './Menu.module.scss'
import { MenuData, MenuItem } from './Menu.interface'

const Menu = ({links}: MenuData) => {
    return (
    <nav className={styles.menu}>
        {links.map((link: MenuItem)=> {
            return (<li key={link.uuid}>{link.name}</li>)
        })}
    </nav>)
}

export default Menu