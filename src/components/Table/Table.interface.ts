import { MerchantTransaction } from "@/interfaces";

export interface TableData {
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
