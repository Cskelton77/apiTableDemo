import { Header, Menu, MenuItem, Footer } from "@/components/"
import styles from './PageWrapper.module.scss'

interface PageWrapper {
    children: React.ReactNode
}
const PageWrapper = ({children}: PageWrapper) => {

    const menuLinks: Array<MenuItem> = [
        {uuid: 1, name: "Home", link: "#"}, 
        {uuid: 2, name: "Financial Table", link: "#"}, 
        {uuid: 3, name: "About", link: "#"}, 
        {uuid: 4, name: "Contact", link: "#"}, 
        {uuid: 5, name: "Log Out", link: "#"}, 
    ]

    return (
        <>
            <Header />
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
