import { useEffect, useState } from "react"
import { PageWrapper, Table, TableData } from "@/components/"
import { MerchantApiResponse, MerchantTransaction } from "@/interfaces"
import { prepareMerchantData } from "@/utilities"

export default function Home() {

    const defaultTableData: TableData = {
        headers: [
            {header: "IBAN", key: 'iban'},
            {header: "Merchant", key: 'merchant'},
            {header: "Amount", key: 'amount'},
            {header: "Fees", key: 'fee'},
            {header: "Net", key: 'net'}],
        rows: []
    }

    const [transactionsData, setTransactionsData] = useState<TableData>(defaultTableData)

    useEffect(() => {
        const fetchMerchants = async () => {
            const newTransactionsTable: TableData = {
                ...transactionsData,
                rows: []
            }
            const data = await fetch("/api/merchants")
            const listOfMerchants = await data.json()
            const transactions: Array<MerchantTransaction> = await Promise.all(listOfMerchants.map(async (merchant: string) => {
                const data = await fetch(`api/merchants/${merchant}`)
                if(data.ok){
                    const merchantData: MerchantApiResponse = await data.json()
                    return prepareMerchantData(merchantData)
                }
                return undefined
            }))
            newTransactionsTable.rows = transactions.filter((transaction) => transaction !== undefined)
            setTransactionsData(newTransactionsTable)
        }
        fetchMerchants()
    }, [])

    return (
        <PageWrapper>
                <Table  tableTitle={"Transactions"} {...transactionsData} />
        </PageWrapper>
    )
}
