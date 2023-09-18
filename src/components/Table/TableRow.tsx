import styles from './Table.module.scss'
import { TableRowData } from "./Table.interface";
import { MerchantTransaction } from '@/interfaces';

interface Column {
    header: string,
    data: string | number,
}

const TableRow = ({headers, row}: TableRowData) => {
    const columns: Array<Column> = [];
    headers.forEach(({ header, key }) => {
        let data = row[key as keyof MerchantTransaction]
        if(typeof data === 'number'){
            data = `${data.toFixed(2)} GBP`
        }
        columns.push({
            header: header,
            data
        })
    })
    
    return (
        <tr>
            {columns.map((column) => {
                return (
                    <td key={0}>
                        <span className={styles.header}>{column.header}</span> 
                        <span className={styles.data}>{column.data}</span>
                    </td>
                )
            })}
        </tr>
    )
}

export default TableRow