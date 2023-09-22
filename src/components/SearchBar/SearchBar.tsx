import styles from './SearchBar.module.scss'

interface SearchBarProps {
    value: string,
    searchFunction: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBar = ({value, searchFunction}: SearchBarProps) => {
    
    return (<input 
                aria-label="searchbar" 
                placeholder={"Search..."} 
                className={styles.searchbar} 
                value={value} 
                onChange={searchFunction} />)   
}

export default SearchBar
