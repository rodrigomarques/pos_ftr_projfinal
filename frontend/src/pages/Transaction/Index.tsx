import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Pencil,
  ArrowDownCircle,
  ArrowUpCircle,
  Utensils,
  Car,
  ShoppingCart,
  PiggyBank,
  Wallet,
  Ticket,
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
import { useState } from "react"
import { NewTransactionModal } from "@/components/newTransactionModal"


type Row = {
  id: string
  title: string
  date: string
  category: { name: string; color: string }
  type: "income" | "expense"
  value: string
  icon: React.ReactElement
  iconBg: string
  iconColor: string
}

export function Transaction() {
  const rows: Row[] = [
    {
      id: "1",
      title: "Jantar no Restaurante",
      date: "30/11/25",
      category: { name: "Alimentação", color: "#2563eb" },
      type: "expense",
      value: "R$ 89,50",
      icon: <Utensils className="h-5 w-5" />,
      iconBg: "#dbeafe",
      iconColor: "#2563eb",
    },
    {
      id: "2",
      title: "Posto de Gasolina",
      date: "29/11/25",
      category: { name: "Transporte", color: "#7c3aed" },
      type: "expense",
      value: "R$ 100,00",
      icon: <Car className="h-5 w-5" />,
      iconBg: "#ede9fe",
      iconColor: "#7c3aed",
    },
    {
      id: "3",
      title: "Compras no Mercado",
      date: "28/11/25",
      category: { name: "Mercado", color: "#ea580c" },
      type: "expense",
      value: "R$ 156,80",
      icon: <ShoppingCart className="h-5 w-5" />,
      iconBg: "#ffedd5",
      iconColor: "#ea580c",
    },
    {
      id: "4",
      title: "Retorno de Investimento",
      date: "26/11/25",
      category: { name: "Investimento", color: "#16a34a" },
      type: "income",
      value: "R$ 340,25",
      icon: <PiggyBank className="h-5 w-5" />,
      iconBg: "#dcfce7",
      iconColor: "#16a34a",
    },
    {
      id: "5",
      title: "Aluguel",
      date: "26/11/25",
      category: { name: "Utilidades", color: "#ca8a04" },
      type: "expense",
      value: "R$ 1.700,00",
      icon: <Wallet className="h-5 w-5" />,
      iconBg: "#fef3c7",
      iconColor: "#ca8a04",
    },
    {
      id: "6",
      title: "Freelance",
      date: "24/11/25",
      category: { name: "Salário", color: "#16a34a" },
      type: "income",
      value: "R$ 2.500,00",
      icon: <Wallet className="h-5 w-5" />,
      iconBg: "#dcfce7",
      iconColor: "#16a34a",
    },
    {
      id: "7",
      title: "Compras Jantar",
      date: "22/11/25",
      category: { name: "Mercado", color: "#ea580c" },
      type: "expense",
      value: "R$ 150,00",
      icon: <ShoppingCart className="h-5 w-5" />,
      iconBg: "#ffedd5",
      iconColor: "#ea580c",
    },
    {
      id: "8",
      title: "Cinema",
      date: "18/11/25",
      category: { name: "Entretenimento", color: "#db2777" },
      type: "expense",
      value: "R$ 88,00",
      icon: <Ticket className="h-5 w-5" />,
      iconBg: "#fce7f3",
      iconColor: "#db2777",
    },
  ]

  const [open, setOpen] = useState(false)

  return (
    <Page>
      <NewTransactionModal open={open} onOpenChange={setOpen} />
      <div className="space-y-6 p-6 bg-muted/40 min-h-screen">
        {/* HEADER */}
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

        {/* FILTERS */}
        <Card className="bg-white border-none">
          <CardContent className="p-5 grid gap-4 md:grid-cols-4">
            {/* Buscar */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar por descrição"
                  className="pl-10 h-11 focus:ring-0
                    border-gray-200
                    focus-visible:ring-0
                    focus-visible:ring-offset-0"
                />
              </div>
            </div>

            {/* Tipo */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo</label>
              <Select defaultValue="all">
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
                  <SelectItem value="income">Entrada</SelectItem>
                  <SelectItem value="expense">Saída</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Categoria */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria</label>
              <Select defaultValue="all">
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
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Período</label>
              <Select defaultValue="nov">
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
                  <SelectItem value="nov">Novembro / 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* TABLE */}
        <Card className="bg-white border-none">
          <CardContent className="p-0">
            {/* Header */}
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
              {rows.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-[1fr_120px_160px_120px_140px_100px] items-center px-6 py-4 border-b border-gray-200"
                >
                  {/* Descrição */}
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: row.iconBg,
                        color: row.iconColor,
                      }}
                    >
                      {row.icon}
                    </div>

                    <span className="text-sm font-medium">
                      {row.title}
                    </span>
                  </div>

                  {/* Data */}
                  <span className="text-sm text-muted-foreground">
                    {row.date}
                  </span>

                  {/* Categoria */}
                  <Badge
                    label={row.category.name}
                    color={row.category.color}
                  />

                  {/* Tipo */}
                  <div className="flex items-center gap-2 text-sm">
                    {row.type === "income" ? (
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
                    {row.type === "income"
                      ? `+ ${row.value}`
                      : `- ${row.value}`}
                  </span>

                  {/* Ações */}
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4">
              <span className="text-sm text-muted-foreground">
                1 a 10 | 27 resultados
              </span>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <Button className="h-8 w-8 bg-emerald-700 text-white">
                  1
                </Button>

                <Button variant="outline" className="h-8 w-8">
                  2
                </Button>
                <Button variant="outline" className="h-8 w-8">
                  3
                </Button>

                <Button variant="outline" size="icon" className="h-8 w-8">
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