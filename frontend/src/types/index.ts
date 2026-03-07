import {
  ShoppingBag,
  Car,
  Heart,
  PiggyBank,
  ShoppingCart,
  Ticket,
  Gift,
  Utensils,
  Sparkles,
  Home,
  Package,
  BookOpen,
  Dumbbell,
  Bus,
  CreditCard,
  Receipt,
} from "lucide-react"

export interface User {
  id: string
  name: string
  email: string
  createdAt?: string
  updatedAt?: string
}


export interface CreateUserInput {
  name: string
  email: string
  password: string
}


export interface LoginInput {
  email: string
  password: string
}

export interface UpdateUserInput {
  id: string,
  email: string,
  name: string
}

export interface CreateCategoryInput {
  name: string
  color: string
  icon?: string
  description?: string
}

export interface UpdateCategoryInput {
  id: string
  name: string
  color: string
  icon?: string
  description?: string
}

export type Category = {
  id: string
  name: string
  description: string
  color: string
  icon: string
}

export type TransactionType = "EXPENSE" | "INCOME"

export interface CreateTransactionInput {
  title: string
  amount: number
  date: string
  type: TransactionType
  categoryId: string
}

export interface UpdateTransactionInput {
  id: string
  title: string
  amount: number
  date: string
  type: TransactionType
  categoryId: string
}

export type Transaction = {
  id: string
  title: string
  amount: number
  type: TransactionType
  date: string
  categoryId: string
  category: Category
}

export type TransactionFilterInput = {
  description?: string
  type?: "INCOME" | "EXPENSE"
  categoryId?: string
  period?: string
}

export const ICONS = [
  { name: "bag", Icon: ShoppingBag },
  { name: "car", Icon: Car },
  { name: "heart", Icon: Heart },
  { name: "pig", Icon: PiggyBank },
  { name: "cart", Icon: ShoppingCart },
  { name: "ticket", Icon: Ticket },
  { name: "gift", Icon: Gift },
  { name: "food", Icon: Utensils },
  { name: "spark", Icon: Sparkles },
  { name: "home", Icon: Home },
  { name: "box", Icon: Package },
  { name: "book", Icon: BookOpen },
  { name: "gym", Icon: Dumbbell },
  { name: "bus", Icon: Bus },
  { name: "card", Icon: CreditCard },
  { name: "receipt", Icon: Receipt },
]