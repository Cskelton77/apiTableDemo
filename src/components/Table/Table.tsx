import { TableData } from "./Table.interface"
import styles from './Table.module.scss'

const Table = ({headers, data}: TableData) => {
    const isDataLoaded = typeof data[0] == "object"
    const isDataLengthMatched = isDataLoaded && headers.length == Object.keys(data[0]).length
   
    if(isDataLengthMatched){
        return (
            <table className={styles.transactionTable}>
                <thead>
                    <tr>
                        { headers.map((header) =>( <th key={header}>{header}</th> ))}
                    </tr>
                </thead>
                <tbody>
                        { data.map(({iban, merchant, amount, fee, net}) => {
                            return (
                            <tr key={iban+merchant}>
                                <td>{iban}</td>
                                <td>{merchant}</td>
                                <td>£{amount.toFixed(2)}</td>
                                <td>£{fee.toFixed(2)}</td>
                                <td>£{net.toFixed(2)}</td>
                            </tr>
                            )
                        })}
                </tbody>
            </table>
        )
    }
    return ('header/data mismatch')

}

export default Table
