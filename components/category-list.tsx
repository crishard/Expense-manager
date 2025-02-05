"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { useEffect, useState } from "react"

type Category = {
  id: number
  name: string
}

export function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCategories = () => {
      try {
        const storedCategories = localStorage.getItem("expense_manager_categories")
        if (storedCategories) {
          const parsedCategories = JSON.parse(storedCategories)
          setCategories(parsedCategories)
        }
      } catch (error) {
        console.error("Error loading categories:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCategories()

    const interval = setInterval(loadCategories, 1000) // Verifica mudanças a cada segundo

    return () => clearInterval(interval)
  }, [])

  const handleDelete = (id: number) => {
    try {
      const updatedCategories = categories.filter((category) => category.id !== id)
      setCategories(updatedCategories)
      localStorage.setItem("expense_manager_categories", JSON.stringify(updatedCategories))
    } catch (error) {
      console.error("Error deleting category:", error)
    }
  }

  if (loading) {
    return <div className="text-center">Loading categories...</div>
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {categories.map((category) => (
              <motion.li
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center border-b pb-2"
              >
                <p className="font-medium">{category.name}</p>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  aria-label="Delete category"
                >
                  <X size={18} />
                </button>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}
