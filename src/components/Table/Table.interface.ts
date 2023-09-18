import { MerchantTransaction } from "@/interfaces";

export interface TableData {
    tableTitle: string,
    headers: Array<Header>,
    rows: Array<MerchantTransaction>
}

export interface TableRowData {
    headers: Array<Header>,
    row: MerchantTransaction
}

interface Header {
    header: string,
    key: string
}
