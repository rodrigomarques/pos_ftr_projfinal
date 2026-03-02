import {
  Plus,
  Tag,
  ArrowRightLeft,
  Utensils,
  Film,
  PiggyBank,
  ShoppingCart,
  Wallet,
  HeartPulse,
  Car,
  Lightbulb,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/dashboard/stat-card"
import { Page } from "@/components/Page"
import { CategoryCard } from "@/components/CategoryCard"
import { useState } from "react"
import { NewCategoryModal } from "@/components/NewCategoryModal"

export type Category = {
  id: string
  name: string
  description: string
  color: string
  items: number
  icon: React.ReactElement
  iconBg: string
  iconColor: string
}

export default function Category() {
  const categories: Category[] = [
    {
      id: "1",
      name: "Alimentação",
      description: "Restaurantes, delivery e refeições",
      color: "#2563eb",
      items: 12,
      icon: <Utensils className="h-5 w-5" />,
      iconBg: "#dbeafe",
      iconColor: "#2563eb",
    },
    {
      id: "2",
      name: "Entretenimento",
      description: "Cinema, jogos e lazer",
      color: "#db2777",
      items: 2,
      icon: <Film className="h-5 w-5" />,
      iconBg: "#fce7f3",
      iconColor: "#db2777",
    },
    {
      id: "3",
      name: "Investimento",
      description: "Aplicações e retornos financeiros",
      color: "#16a34a",
      items: 1,
      icon: <PiggyBank className="h-5 w-5" />,
      iconBg: "#dcfce7",
      iconColor: "#16a34a",
    },
    {
      id: "4",
      name: "Mercado",
      description: "Compras de supermercado e mantimentos",
      color: "#ea580c",
      items: 3,
      icon: <ShoppingCart className="h-5 w-5" />,
      iconBg: "#ffedd5",
      iconColor: "#ea580c",
    },
    {
      id: "5",
      name: "Salário",
      description: "Renda mensal e bonificações",
      color: "#16a34a",
      items: 3,
      icon: <Wallet className="h-5 w-5" />,
      iconBg: "#dcfce7",
      iconColor: "#16a34a",
    },
    {
      id: "6",
      name: "Saúde",
      description: "Medicamentos, consultas e exames",
      color: "#dc2626",
      items: 0,
      icon: <HeartPulse className="h-5 w-5" />,
      iconBg: "#fee2e2",
      iconColor: "#dc2626",
    },
    {
      id: "7",
      name: "Transporte",
      description: "Gasolina, transporte público e viagens",
      color: "#7c3aed",
      items: 8,
      icon: <Car className="h-5 w-5" />,
      iconBg: "#ede9fe",
      iconColor: "#7c3aed",
    },
    {
      id: "8",
      name: "Utilidades",
      description: "Energia, água, internet e telefone",
      color: "#ca8a04",
      items: 7,
      icon: <Lightbulb className="h-5 w-5" />,
      iconBg: "#fef3c7",
      iconColor: "#ca8a04",
    },
  ]
  const [open, setOpen] = useState(false)  
  
  return (
    <Page>
      <NewCategoryModal open={open} onOpenChange={setOpen} />
    <div className="space-y-6 p-6 bg-muted/40 min-h-screen">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Categorias</h1>
          <p className="text-sm text-muted-foreground">
            Organize suas transações por categorias
          </p>
        </div>

        <Button className="bg-emerald-700 hover:bg-emerald-800 text-white"  onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova categoria
        </Button>
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          inverse
          icon={<Tag className="h-5 w-5 text-violet-600" />}
          label="8"
          value="TOTAL DE CATEGORIAS"
        />

        <StatCard
          inverse
          icon={<ArrowRightLeft className="h-5 w-5 text-purple-600" />}
          label="27"
          value="TOTAL DE TRANSAÇÕES"
        />

        <StatCard
          inverse
          icon={<Utensils className="h-5 w-5 text-blue-600" />}
          label="Alimentação"
          value="CATEGORIA MAIS UTILIZADA"
        />
      </div>

      {/* GRID */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
    </Page>
  )
}