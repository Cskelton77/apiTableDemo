import styles from './Header.module.scss'

const Header = ({title}: { title: string }) => {
    return (
    <div className={styles.header}>
            <h1>{title}</h1>
    </div>)
}

export default Header
