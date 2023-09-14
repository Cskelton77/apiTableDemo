import { useEffect, useState } from "react"
import { Header, Menu, MenuItem, Table, TableData, Footer } from "@/components/"
import { MerchantApiResponse } from "@/interfaces/MerchantApiResponse"
import { MerchantTransaction } from "@/interfaces/MerchantTransaction"
import { Transaction } from "@/interfaces/Transaction"
import styles from '@/styles/index.module.scss'

export default function Home() {

    const defaultTableData: TableData = {
        headers: ["IBAN", "Merchant", "Amount", "Fees", "Net"],
        data: []
    }
    const [transactionsData, setTransactionsData] = useState<TableData>(defaultTableData)
    const calculateDiscount = (amt: number, discount: number): number =>  (amt - (amt * (discount/100)))

    useEffect(() => {
        const fetchMerchants = async () => {
            const newTransactionsTable: TableData = {
                headers: transactionsData.headers,
                data: []
            }

            const data = await fetch("/api/merchants")
            const listOfMerchants = await data.json()

            const transactions: Array<MerchantTransaction> = await Promise.all(listOfMerchants.map(async (merchant: string) => {
                const data = await fetch(`api/merchants/${merchant}`)
                if(data.ok){
                    const merchantData: MerchantApiResponse = await data.json()

                    const currentMerchantTransaction: MerchantTransaction = {
                        iban: merchantData.iban,
                        merchant: merchantData.name,
                        amount: 0,
                        fee: 0,
                        net: 0,
                    }
                
                    merchantData.transactions.forEach((transaction: Transaction) => {
                        currentMerchantTransaction.amount += transaction.amount
                        currentMerchantTransaction.fee += transaction.fee
                    })
    
                    const { minTransactions, feeDiscountPercentage } = merchantData.discount
                    const hasTransactionDiscount = merchantData.transactions.length >= minTransactions
                    
                    if(hasTransactionDiscount){
                        currentMerchantTransaction.fee = calculateDiscount(currentMerchantTransaction.fee, feeDiscountPercentage)
                    }
                        
                    currentMerchantTransaction.amount = Math.round(currentMerchantTransaction.amount) / 100
                    currentMerchantTransaction.fee = Math.round(currentMerchantTransaction.fee) / 100
                    currentMerchantTransaction.net = Math.round(currentMerchantTransaction.amount - currentMerchantTransaction.fee) / 100
    
                    return currentMerchantTransaction
                }
                return undefined
            }))
            newTransactionsTable.data = transactions.filter((transaction) => transaction !== undefined)
            setTransactionsData(newTransactionsTable)
        }
        fetchMerchants()
    }, [])

    const menuLinks: Array<MenuItem> = [
        {uuid: 1, name: "Home", link: "#"}, 
        {uuid: 2, name: "Financial Table", link: "#"}, 
        {uuid: 3, name: "About", link: "#"}, 
        {uuid: 4, name: "Contact", link: "#"}, 
        {uuid: 5, name: "Log Out", link: "#"}, 
    ]

    return (
        <>
            <Header />
            <div className={styles.pageWrapper}>
                <Menu links={menuLinks} />
                <Table headers={transactionsData.headers} data={transactionsData.data} />
            </div>
            <Footer />
        </>
    )
}
