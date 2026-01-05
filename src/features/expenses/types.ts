// Expenses module types
export interface Expense {
  id: string
  userId: string
  category: 'travel' | 'meals' | 'accommodation' | 'transport' | 'other'
  amount: number
  currency: string
  date: Date
  description: string
  receiptUrl?: string
  status: 'pending' | 'approved' | 'rejected' | 'reimbursed'
  approverId?: string
  createdAt: Date
  updatedAt: Date
}

export interface ExpenseReport {
  id: string
  userId: string
  title: string
  expenses: Expense[]
  totalAmount: number
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
  submittedAt?: Date
}

