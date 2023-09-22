import { useEffect, useState } from "react"
import axios from "axios"
import { PageWrapper, Table, TableData } from "@/components/"
import { MerchantApiResponse, MerchantTransaction } from "@/interfaces"
import { prepareMerchantData } from "@/utilities/prepareMerchantData"

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
            try{
                const {data: listOfMerchants}: { data: Array<string>} = await axios.get('api/merchants');
                const transactions: Array<MerchantTransaction> = await Promise.all(listOfMerchants.map(async (merchant: string) => {
                    try{
                        const {statusText, data: merchantData}: { statusText: string, data: MerchantApiResponse} = await axios.get(`api/merchants/${merchant}`)
                        if(statusText=="OK"){ 
                            return prepareMerchantData(merchantData)
                        }
                        return undefined
                    } catch(error) {
                        // log network error
                    };
                }))
                newTransactionsTable.rows = transactions.filter((transaction) => transaction !== undefined)
                setTransactionsData(newTransactionsTable)
            } catch(error) {
                // log network error
            };
        }
        fetchMerchants()
    }, [])

    return (
        <PageWrapper title={"Displaying results from an API call"}>
            <Table tableTitle={"Transactions"} {...transactionsData} />
        </PageWrapper>
    )
}
