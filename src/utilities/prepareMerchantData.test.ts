import { MerchantApiResponse, MerchantTransaction, Transaction } from "@/interfaces";
import { prepareMerchantData } from './prepareMerchantData'

describe("Function prepareMerchantData should transform MerchantApiResponse into MerchantTransaction", () => {

    const iban = '002211';
    const merchant = 'this merchant';

    test('with discount', () => {
        const MerchantApiResponse: MerchantApiResponse = {
            id: '2',
            name: merchant,
            iban,
            discount: {
                minTransactions: 1,
                feeDiscountPercentage: 10
            },
            transactions: [
                {amount: 1000, fee: 100},
                {amount: 1000, fee: 100},
                {amount: 1000, fee: 100},
            ]
        }
        // Sum of amount is 3000, divided by 100 => £30
        // Sum of fee is 300, divided by 100 => £3, minus 10% discount => £2.70
        // £30 - £2.70 = £27.30
    
        const ExpectedMerchantTransaction: MerchantTransaction = {
            iban,
            merchant,
            amount: 30,
            fee: -2.7,
            net: 27.3,
        }
    
        const MerchantTransaction = prepareMerchantData(MerchantApiResponse)
        expect(MerchantTransaction).toEqual(ExpectedMerchantTransaction)
    })

    test('Without discount', () => {
        const MerchantApiResponse: MerchantApiResponse = {
            id: '2',
            name: merchant,
            iban,
            discount: {
                minTransactions: 4,
                feeDiscountPercentage: 10
            },
            transactions: [
                {amount: 1000, fee: 100},
                {amount: 1000, fee: 100},
                {amount: 1000, fee: 100},
            ]
        }
        // Sum of amount is 3000, divided by 100 => £30
        // Sum of fee is 300, divided by 100 => £3, no discount.
        // £30 - £3 = £27
    
        const ExpectedMerchantTransaction: MerchantTransaction = {
            iban,
            merchant,
            amount: 30,
            fee: -3,
            net: 27,
        }
    
        const MerchantTransaction = prepareMerchantData(MerchantApiResponse)
        expect(MerchantTransaction).toEqual(ExpectedMerchantTransaction)

    })
    
})