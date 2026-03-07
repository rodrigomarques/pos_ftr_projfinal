import {
  Plus,
  Tag,
  ArrowRightLeft,
  CircleHelp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/dashboard/stat-card"
import { Page } from "@/components/Page"
import { CategoryCard } from "@/components/CategoryCard"
import { useEffect, useMemo, useState } from "react"
import { NewCategoryModal } from "@/components/NewCategoryModal"
import { useMutation, useQuery } from "@apollo/client/react"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Categories"
import { GlobalLoading } from "@/components/GlobalLoading"
import { DELETE_CATEGORY } from "@/lib/graphql/mutations/categories/Index"
import { toast } from "sonner"
import { ICONS } from "@/types"

export type Category = {
  id: string
  name: string
  description: string
  color: string
  items: number
  icon: string
}

export default function Category() {

  const { data, loading, refetch } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES)
  const listCategories = data?.listCategories || []
  const [open, setOpen] = useState(false)  

  const [totalTransacoes, setTotalTransacoes] = useState(0)
  const [categoryMostUsed, setCategoryMostUsed] = useState<Category|null>(null)
  const [category, setCategory] = useState<Category|null>(null)

  const [deleteCategoryMutation, { loading: deleting }] = useMutation(DELETE_CATEGORY, {
    onCompleted: () => {
      toast.success("Categoria deletada com sucesso!")
    },
    refetchQueries: [LIST_CATEGORIES],
  })

  const CategoryIcon = useMemo(() => {
    if (!categoryMostUsed) return null
    return ICONS.find(
      (icon) => icon.name === (typeof categoryMostUsed.icon === "string" ? categoryMostUsed.icon : "")
    )?.Icon ?? null
  }, [categoryMostUsed])

  useEffect(() => {
    setOpen(category != null)
  }, [category])
  
  const handleOpenChange = (value: boolean) => {
    setOpen(value)

    if (!value) {
      setCategory(null)
    }
  }

  return (
    <Page>
      <GlobalLoading open={loading || deleting} /> 
      <NewCategoryModal open={open} onOpenChange={handleOpenChange} category={category} refetchCategories={refetch} />
      
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
          label={listCategories.length.toString()}
          value="TOTAL DE CATEGORIAS"
        />

        <StatCard
          inverse
          icon={<ArrowRightLeft className="h-5 w-5 text-purple-600" />}
          label={totalTransacoes.toString()}
          value="TOTAL DE TRANSAÇÕES"
        />

        <StatCard
          inverse
          icon={CategoryIcon ? <CategoryIcon className="h-6 w-6 text-blue-600" /> : <CircleHelp className="h-6 w-6 text-blue-600" />}
          label={categoryMostUsed?.name || "Nenhuma categoria"}
          value="CATEGORIA MAIS UTILIZADA"
        />
      </div>

      {/* GRID */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {listCategories.map((category) => (
          <CategoryCard key={category.id} category={category} setCategory={setCategory} onDelete={() => deleteCategoryMutation({ variables: { id: category.id } })} />
        ))}
      </div>
    </div>
    </Page>
  )
}