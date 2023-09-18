import TableRow from "./TableRow"
import { TableData } from "./Table.interface"
import styles from './Table.module.scss'

const Table = ({tableTitle, headers, rows}: TableData) => {
    const isDataLoaded = typeof rows[0] == "object"
    const isDataLengthMatched = isDataLoaded && headers.length == Object.keys(rows[0]).length
   
    if(isDataLengthMatched){        
       return (
        <div className={styles.transactionTable}>
            <h2>{tableTitle}</h2>
            
            <table >
                <thead>
                    <tr>
                        { headers.map((header) =>( <th key={header.header}>{header.header}</th> ))}
                    </tr>
                </thead>
                <tbody>
                        { rows.map((row) => {
                            return (<TableRow key={row.iban} headers={headers} row={row} />)
                        })}
                </tbody>
            </table>
        </div>
        )
    }
    return ('header/data mismatch')
}

export default Table
