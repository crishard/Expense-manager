import { AddCategoryForm } from "@/components/add-category-form"
import { CategoryList } from "@/components/category-list"
import { Header } from "@/components/header"

export default function CategoriesPage() {
  return (
    <main>
      <Header />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AddCategoryForm />
          <CategoryList />
        </div>
      </div>
    </main>
  )
}

