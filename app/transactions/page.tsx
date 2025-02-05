import { AddTransactionForm } from "@/components/add-transaction-form"
import { Header } from "@/components/header"
import { TransactionList } from "@/components/transaction-list"

export default function TransactionsPage() {
  return (
    <main>
      <Header />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Transactions</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AddTransactionForm />
          <TransactionList />
        </div>
      </div>
    </main>
  )
}

