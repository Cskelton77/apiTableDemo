import { useEffect, useState } from "react"
import { Header, Menu, MenuItem, Table, TableData, Footer } from "@/components/"
import { MerchantApiResponse, MerchantTransaction } from "@/interfaces"
import { prepareMerchantData } from "@/utilities"
import styles from '@/styles/index.module.scss'

export default function Home() {

    const menuLinks: Array<MenuItem> = [
        {uuid: 1, name: "Home", link: "#"}, 
        {uuid: 2, name: "Financial Table", link: "#"}, 
        {uuid: 3, name: "About", link: "#"}, 
        {uuid: 4, name: "Contact", link: "#"}, 
        {uuid: 5, name: "Log Out", link: "#"}, 
    ]

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
        <>
            <Header />
            <div className={styles.pageWrapper}>
                <Menu links={menuLinks} />                
                <Table  tableTitle={"Transactions"} {...transactionsData} />
            </div>
            <Footer />
        </>
    )
}
