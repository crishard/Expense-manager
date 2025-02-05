"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "../hooks/use-toast"
import { storage } from "../lib/storage"

type Category = {
  id: number
  name: string
}

type FormData = {
  description: string
  amount: number
  type: "income" | "expense"
  category: string
  date: string
}

export function AddTransactionForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const loadCategories = () => {
      try {
        const storedCategories = localStorage.getItem('expense_manager_categories')
        if (storedCategories) {
          const parsedCategories: Category[] = JSON.parse(storedCategories)
          setCategories(parsedCategories.map(cat => cat.name))
        }
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    }

    loadCategories()

    window.addEventListener('storage', loadCategories)

    return () => {
      window.removeEventListener('storage', loadCategories)
    }
  }, [])

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    const newTransaction = {
      ...data,
      id: Date.now().toString(),
      amount: Number(data.amount),
    }
    storage.addTransaction(newTransaction)
    setIsSubmitting(false)
    reset()
    toast({
      title: "Transaction added",
      description: "Your transaction has been successfully added.",
    })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle>Add Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="description">Description</Label>
              <Input id="description" {...register("description", { required: "Description is required" })} />
              {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                {...register("amount", { required: "Amount is required", min: 0 })}
              />
              {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                {...register("type", { required: "Type is required" })}
                className="w-full p-2 border rounded"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              {categories.length > 0 ? (
                <select
                  id="category"
                  {...register("category", { required: "Category is required" })}
                  className="w-full p-2 border rounded"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              ) : (
                <Input id="category" {...register("category", { required: "Category is required" })} />
              )}
              {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" {...register("date", { required: "Date is required" })} />
              {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Transaction"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}