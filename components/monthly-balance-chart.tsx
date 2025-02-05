"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { storage } from "@/lib/storage"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type MonthlyData = {
  month: string
  income: number
  expenses: number
  balance: number
}

export function MonthlyBalanceChart() {
  const [data, setData] = useState<MonthlyData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const transactions = storage.getTransactions()
    const monthlyData: { [key: string]: MonthlyData } = {}

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date)
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { month: monthYear, income: 0, expenses: 0, balance: 0 }
      }

      if (transaction.type === "income") {
        monthlyData[monthYear].income += transaction.amount
      } else {
        monthlyData[monthYear].expenses += transaction.amount
      }
      monthlyData[monthYear].balance = monthlyData[monthYear].income - monthlyData[monthYear].expenses
    })

    const sortedData = Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month))
    setData(sortedData)
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="text-center">Loading monthly balance data...</div>
  }

  return (
    
    
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle>Monthly Balance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#8884d8" />
              <Bar dataKey="expenses" fill="#82ca9d" />
              <Bar dataKey="balance" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}

