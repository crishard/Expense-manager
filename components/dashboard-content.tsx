"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { storage } from "@/lib/storage"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Define interface for the data structure
interface ChartData {
  name: string
  value: number
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export function DashboardContent() {
  const [expenseData, setExpenseData] = useState<ChartData[]>([])
  const [incomeData, setIncomeData] = useState<ChartData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const transactions = storage.getTransactions()
    const expensesByCategory: { [key: string]: number } = {}
    const incomeByCategory: { [key: string]: number } = {}

    transactions.forEach((transaction) => {
      if (transaction.type === "expense") {
        expensesByCategory[transaction.category] = (expensesByCategory[transaction.category] || 0) + transaction.amount
      } else {
        incomeByCategory[transaction.category] = (incomeByCategory[transaction.category] || 0) + transaction.amount
      }
    })

    setExpenseData(Object.entries(expensesByCategory).map(([name, value]) => ({ name, value })))
    setIncomeData(Object.entries(incomeByCategory).map(([name, value]) => ({ name, value })))
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 sm:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Income Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={incomeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Expense Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-1 sm:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {storage
                .getTransactions()
                .slice(0, 5)
                .map((transaction) => (
                  <li key={transaction.id} className="flex justify-between items-center">
                    <span>{transaction.description}</span>
                    <span className={transaction.type === "income" ? "text-green-500" : "text-red-500"}>
                      {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </span>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}