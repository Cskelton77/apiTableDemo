import { Header, Menu, MenuItem, Footer } from "@/components/"
import styles from './PageWrapper.module.scss'

interface PageWrapper {
    title: string,
    menuLinks?: Array<MenuItem>,
    children: React.ReactNode
}

const defaultMenuLinks: Array<MenuItem> = [
    {uuid: 1, name: "Home", link: "/"}, 
    {uuid: 2, name: "Financial Table", link: "/table"}, 
    {uuid: 3, name: "About", link: "/about"}, 
    {uuid: 4, name: "Contact", link: "/contact"}, 
    {uuid: 5, name: "Log Out", link: "/log-out"}, 
] 

const PageWrapper = ({title, menuLinks = defaultMenuLinks, children}: PageWrapper) => {

    return (
        <>
            <Header title={title} />
            <div className={styles.page}>
                <Menu links={menuLinks} />
                <span className={styles.content}>
                    {children}
                </span>
            </div>
            <Footer />
        </>
    )    
}

export default PageWrapper
