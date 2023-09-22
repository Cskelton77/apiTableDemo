import { MerchantApiResponse, MerchantTransaction, Transaction } from "@/interfaces";

const calculateDiscount = (amt: number, discount: number): number =>  (amt - (amt * (discount/100)))

export const prepareMerchantData = (merchantData: MerchantApiResponse): MerchantTransaction => {

  const currentMerchantTransaction: MerchantTransaction = {
    iban: merchantData.iban,
    merchant: merchantData.name,
    amount: 0,
    fee: 0,
    net: 0,
  };

  merchantData.transactions.forEach((transaction: Transaction) => {
    currentMerchantTransaction.amount += transaction.amount;
    currentMerchantTransaction.fee += transaction.fee;
  });

  const { minTransactions, feeDiscountPercentage } = merchantData.discount;
  const hasTransactionDiscount =
    merchantData.transactions.length >= minTransactions;

  if (hasTransactionDiscount) {
    currentMerchantTransaction.fee = calculateDiscount(
      currentMerchantTransaction.fee,
      feeDiscountPercentage
    );
  }

  currentMerchantTransaction.net = (currentMerchantTransaction.amount - currentMerchantTransaction.fee) / 100;
  currentMerchantTransaction.amount = currentMerchantTransaction.amount / 100;
  currentMerchantTransaction.fee = -(currentMerchantTransaction.fee / 100);

  return currentMerchantTransaction
};
