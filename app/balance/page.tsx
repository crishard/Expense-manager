import { Header } from "@/components/header"
import { MonthlyBalanceChart } from "@/components/monthly-balance-chart"

export default function BalancePage() {
  return (
    <main>
      <Header />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Monthly Balance</h1>
        <MonthlyBalanceChart />
      </div>
    </main>
  )
}

