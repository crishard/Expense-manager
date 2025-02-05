"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useToast } from "../hooks/use-toast"
import { storage } from "../lib/storage"

type FormData = {
  name: string
}

export function AddCategoryForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormData>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    const existingCategories = JSON.parse(
      localStorage.getItem('expense_manager_categories') || '[]'
    )

    const isDuplicate = existingCategories.some(
      (cat: { name: string }) => 
        cat.name.toLowerCase() === data.name.trim().toLowerCase()
    )

    if (isDuplicate) {
      setError('name', {
        type: 'manual', 
        message: 'This category already exists'
      })
      setIsSubmitting(false)
      return
    }

    const newCategory = {
      id: Date.now().toString(),
      name: data.name.trim(),
    }

    storage.addCategory(newCategory)
    
    window.dispatchEvent(new Event('storage'))

    setIsSubmitting(false)
    reset()
    toast({
      title: "Category added",
      description: "Your category has been successfully added.",
    })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle>Add Category</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Category Name</Label>
              <Input 
                id="name" 
                className="mt-2"
                {...register("name", { 
                  required: "Category name is required",
                  validate: (value) => value.trim() !== '' || "Category name cannot be empty"
                })} 
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Category"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}