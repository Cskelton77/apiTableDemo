import { Transaction } from "./Transaction"

export interface MerchantApiResponse {
    id: string,
    name: string,
    iban: string,
    discount: DiscountInterface,
    transactions: Array<Transaction>
}

interface DiscountInterface {
    minTransactions: number,
    feeDiscountPercentage: number
}
