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
import { useQuery } from "@apollo/client/react"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Categories"
import { GlobalLoading } from "@/components/GlobalLoading"

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

  const { data, loading, refetch } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES)
  const listCategories = data?.listCategories || []
  const [open, setOpen] = useState(false)  
  
  return (
    <Page>
      <GlobalLoading open={loading} /> 
      <NewCategoryModal open={open} onOpenChange={setOpen}   refetchCategories={refetch} />
      
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
        {listCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
    </Page>
  )
}