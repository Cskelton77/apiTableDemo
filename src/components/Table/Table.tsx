import { SearchBar } from '@/components'
import TableRow from "./TableRow"
import { TableData } from "./Table.interface"
import styles from './Table.module.scss'
import { useEffect, useState } from 'react'
import { MerchantTransaction } from '@/interfaces/MerchantTransaction'

interface TableProps extends TableData {
    tableTitle?: string,    
    showSearch?: boolean
}

const Table = ({tableTitle, headers, rows, showSearch = true}: TableProps) => {
    const isDataLoaded = typeof rows[0] == "object"
    const isDataLengthMatched = isDataLoaded && headers.length == Object.keys(rows[0]).length

    const [filteredRows, setFilteredRows] = useState<Array<MerchantTransaction>>(rows);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        if(isDataLengthMatched && showSearch){ 
           if(!searchTerm){
                setFilteredRows([...rows]);
            } else {
                let newRowSubset: Array<MerchantTransaction> = [];
                headers.forEach(({ key }) => {
                    const colSearchResults = rows.filter(
                        (row) => {
                            const value: string = row[key as keyof MerchantTransaction].toString().toLowerCase();
                            return value.includes(searchTerm.toLowerCase())
                        }
                    )
                    newRowSubset = newRowSubset.concat(colSearchResults)
                })
                setFilteredRows([...new Set(newRowSubset)])
            }
        }
    }, [rows, searchTerm])
   
    return (
        <div className={styles.transactionTable}>
            <div className={styles.headerArea}>
                { tableTitle && <h2>{tableTitle}</h2> }
                { showSearch && isDataLoaded && <SearchBar value={searchTerm} searchFunction={(e) => setSearchTerm(e.target.value)} /> }
            </div>
            <table >
                {!isDataLoaded && (
                    <tbody>
                        <tr>
                            <td colSpan={headers.length}>{"Loading..."}</td>
                        </tr>
                    </tbody>
                ) }
                {isDataLengthMatched && (
                    <>
                        <thead>
                            <tr>
                                { headers.map((header) =>( <th key={header.header}>{header.header}</th> ))}
                            </tr>
                        </thead>
                        <tbody>
                                { filteredRows.length > 0 && filteredRows.map((row) => {
                                    return (<TableRow key={row.iban + row.merchant} headers={headers} row={row} />)
                                })}
                                { filteredRows.length == 0 && (
                                    <tr>
                                        <td colSpan={headers.length}>{"No transactions match your current search"}</td>
                                    </tr>
                                )}
                        </tbody>
                    </>
                )}
            </table>
        </div>
    )
}

export default Table
