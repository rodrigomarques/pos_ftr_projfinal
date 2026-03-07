import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Pencil,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Page } from "@/components/Page"
import { Badge } from "@/components/Badge"
import { useMemo, useState } from "react"
import { NewTransactionModal } from "@/components/NewTransactionModal"
import type { Category } from "../Category/Index"
import { useMutation, useQuery } from "@apollo/client/react"
import { LIST_TRANSACTIONS } from "@/lib/graphql/queries/Transactions"
import { ICONS, type TransactionPagination, type TransactionType } from "@/types"
import { GlobalLoading } from "@/components/GlobalLoading"
import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/transactions/Index"
import { toast } from "sonner"
import { useDebounce } from "@/hooks/useDebounce"
import { LIST_CATEGORIES_SELECT } from "@/lib/graphql/queries/Categories"


export type Transaction = {
  id: string
  title: string
  date: string
  category: Category
  type: TransactionType
  amount: number
  icon: React.ReactElement
  iconBg: string
  iconColor: string
}

export function Transaction() {

  const last12Months = useMemo(() => {
    const now = new Date()

    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date(now)
      date.setMonth(now.getMonth() - i)

      const month = String(date.getMonth() + 1).padStart(2, "0")
      const year = date.getFullYear()

      const label = date.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
      })

      return {
        value: `${month}/${year}`,
        label: label.charAt(0).toUpperCase() + label.slice(1),
      }
    })
  }, [])

  const [description, setDescription] = useState("")
  const [type, setType] = useState<string>("all")
  const [categoryId, setCategoryId] = useState<string>("all")
  const [period, setPeriod] = useState(last12Months[0]?.value)

  const [page, setPage] = useState(1)
  const limit = 20

  const debouncedSearch = useDebounce(description, 400)
  const { data, loading } = useQuery<{ listTransactions: TransactionPagination }>(
    LIST_TRANSACTIONS,
    {
      variables: {
        filters: {
          ...(debouncedSearch && { description: debouncedSearch }),
          ...(type !== "all" && { type }),
          ...(categoryId !== "all" && { categoryId }),
          ...(period && { period }),
        },
        pagination: {
          page,
          limit,
        },
      },
    }
  )
  const pagination = data?.listTransactions
  const listTransactions = pagination?.data || []

  const { data:dataCategory } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES_SELECT)
  const listCategories = dataCategory?.listCategories || []

  const visiblePages = useMemo(() => {
    const totalPages = data?.listTransactions.totalPages ?? 0
    const maxPages = 5

    if (totalPages <= maxPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    let start = Math.max(page - 2, 1)
    let end = start + maxPages - 1

    if (end > totalPages) {
      end = totalPages
      start = end - maxPages + 1
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [page, data])

  const [deleteTransactionMutation, { loading: deleting }] = useMutation(DELETE_TRANSACTION, {
    onCompleted: () => {
      toast.success("Transação deletada com sucesso!")
    },
    refetchQueries: [LIST_TRANSACTIONS],
  })

  const [open, setOpen] = useState(false)
  const handleOpenChange = (value: boolean) => {
    setOpen(value)
  }
  
  return (
    <Page>
      <GlobalLoading open={loading || deleting} /> 
      <NewTransactionModal open={open} onOpenChange={handleOpenChange}  />
      <div className="space-y-6 p-6 bg-muted/40 min-h-screen">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Transações</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie todas as suas transações financeiras
            </p>
          </div>

          <Button
            className="bg-emerald-700 hover:bg-emerald-800 text-white"
            onClick={() => setOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova transação
          </Button>
        </div>

        <Card className="bg-white border-none">
          <CardContent className="p-5 grid gap-4 md:grid-cols-4">
            {/* Buscar */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por descrição"
                  className="pl-10 h-11 border-gray-200 focus-visible:ring-0"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            {/* Tipo */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo</label>
              <Select defaultValue="all" value={type} onValueChange={setType}>
                <SelectTrigger
                  className="
                    min-h-11
                    w-full
                    justify-between
                    rounded-md
                    border border-input
                    bg-white
                    shadow-sm
                    hover:bg-accent/30
                    focus:outline-none
                    focus:ring-0
                    focus-visible:ring-0
                    focus-visible:ring-offset-0
                    border-gray-200
                  "
                >
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>

                <SelectContent
                  position="popper"
                  side="bottom"
                  align="start"
                  sideOffset={4}
                  className="min-w-[--radix-select-trigger-width] rounded-md border bg-white p-1 shadow-md border-gray-200"
                >
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="INCOME">Entrada</SelectItem>
                  <SelectItem value="EXPENSE">Saída</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Categoria */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria</label>
              <Select defaultValue="all" value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger
                  className="
                    min-h-11
                    w-full
                    justify-between
                    rounded-md
                    border border-input
                    bg-white
                    shadow-sm
                    hover:bg-accent/30
                    focus:outline-none
                    focus:ring-0
                    focus-visible:ring-0
                    focus-visible:ring-offset-0
                    border-gray-200
                  "
                >
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  side="bottom"
                  align="start"
                  sideOffset={4}
                  className="min-w-[--radix-select-trigger-width] rounded-md border bg-white p-1 shadow-md border-gray-200">
                  <SelectItem value="all">Todas</SelectItem>
                  {listCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Período</label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger
                  className="
                    min-h-11
                    w-full
                    justify-between
                    rounded-md
                    border border-input
                    bg-white
                    shadow-sm
                    hover:bg-accent/30
                    focus:outline-none
                    focus:ring-0
                    focus-visible:ring-0
                    focus-visible:ring-offset-0
                    border-gray-200
                  "
                >
                  <SelectValue placeholder="Novembro / 2025" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  side="bottom"
                  align="start"
                  sideOffset={4}
                  className="min-w-[--radix-select-trigger-width] rounded-md border bg-white p-1 shadow-md border-gray-200">
                  {last12Months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none">
          <CardContent className="p-0">
            <div className="grid grid-cols-[1fr_120px_160px_120px_140px_100px] px-6 py-4 text-xs font-semibold text-muted-foreground border-b  border-gray-200">
              <span>DESCRIÇÃO</span>
              <span>DATA</span>
              <span>CATEGORIA</span>
              <span>TIPO</span>
              <span>VALOR</span>
              <span className="text-right">AÇÕES</span>
            </div>

            {/* Rows */}
            <div className="divide-y">
              {listTransactions.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-[1fr_120px_160px_120px_140px_100px] items-center px-6 py-4 border-b border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: row.category.color,
                        color: "#fff",
                      }}
                    >
                      {(() => {
                        const icon = ICONS.find(
                              (icon) => icon.name === (typeof row.category.icon === "string" ? row.category.icon : "")
                            )
                        return icon?.Icon ? <icon.Icon className="h-6 w-6" /> : null
                      })()}
                    </div>

                    <span className="text-sm font-medium">
                      {row.title}
                    </span>
                  </div>

                  <span className="text-sm text-muted-foreground">
                    {
                      new Date(row.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    }
                  </span>

                  <Badge
                    label={row.category.name}
                    color={row.category.color}
                  />

                  {/* Tipo */}
                  <div className="flex items-center gap-2 text-sm">
                    {row.type === "INCOME" ? (
                      <>
                        <ArrowUpCircle className="h-4 w-4 text-emerald-600" />
                        <span className="text-emerald-600">Entrada</span>
                      </>
                    ) : (
                      <>
                        <ArrowDownCircle className="h-4 w-4 text-red-500" />
                        <span className="text-red-500">Saída</span>
                      </>
                    )}
                  </div>

                  {/* Valor */}
                  <span className="text-sm font-semibold">
                  {row.type === "INCOME"
                    ? `+ R$ ${Number(row.amount).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : `- R$ ${Number(row.amount).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`}
                </span>

                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="icon" className="h-9 w-9 border-none" onClick={() => deleteTransactionMutation({ variables: { id: row.id } })}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9 border-none">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-sm text-muted-foreground">
                {(page - 1) * limit + 1} a{" "}
                {Math.min(page * limit, pagination?.total ?? 0)} |{" "}
                {pagination?.total ?? 0} resultados
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 cursor-pointer"
                  disabled={!pagination?.hasPreviousPage}
                  onClick={() => setPage((p) => p - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {visiblePages.map((p) => (
                  <Button
                    key={p}
                    className={`h-8 w-8 cursor-pointer ${
                      p === page
                        ? "bg-emerald-700 text-white"
                        : "variant-outline"
                    }`}
                    variant={p === page ? "default" : "outline"}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 cursor-pointer"
                  disabled={!pagination?.hasNextPage}
                  onClick={() => setPage((p) => p + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Page>
  )
}