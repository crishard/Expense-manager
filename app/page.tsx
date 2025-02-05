import { DashboardContent } from "@/components/dashboard-content"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main>
      <Header />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <DashboardContent />
      </div>
    </main>
  )
}

