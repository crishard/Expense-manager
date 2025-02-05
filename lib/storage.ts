type Transaction = {
    id: string
    description: string
    amount: number
    type: "income" | "expense"
    category: string
    date: string
  }
  
  type Category = {
    id: string
    name: string
  }
  
  const TRANSACTIONS_KEY = "expense_manager_transactions"
  const CATEGORIES_KEY = "expense_manager_categories"
  
  export const storage = {
    getTransactions: (): Transaction[] => {
      const transactions = localStorage.getItem(TRANSACTIONS_KEY)
      return transactions ? JSON.parse(transactions) : []
    },
  
    setTransactions: (transactions: Transaction[]) => {
      localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions))
    },
  
    addTransaction: (transaction: Transaction) => {
      const transactions = storage.getTransactions()
      transactions.push(transaction)
      storage.setTransactions(transactions)
    },
  
    getCategories: (): Category[] => {
      const categories = localStorage.getItem(CATEGORIES_KEY)
      return categories ? JSON.parse(categories) : []
    },
  
    setCategories: (categories: Category[]) => {
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories))
    },
  
    addCategory: (category: Category) => {
      const categories = storage.getCategories()
      categories.push(category)
      storage.setCategories(categories)
    },
  }
  
  