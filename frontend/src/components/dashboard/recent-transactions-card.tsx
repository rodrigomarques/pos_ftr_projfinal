import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChevronRight, Plus, ArrowDownCircle, ArrowUpCircle } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { NewTransactionModal } from "../newTransactionModal"

type TxType = "income" | "expense"

export interface RecentTx {
  id: string
  title: string
  date: string
  category: { name: string; color: string }
  amount: string // ex: "R$ 4.250,00"
  type: TxType
  icon: React.ReactElement
  iconBg: string // ex: "#dcfce7"
  iconColor: string // ex: "#16a34a"
}

function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
      style={{ backgroundColor: `${color}20`, color }}
    >
      {label}
    </span>
  )
}

export function RecentTransactionsCard({
  items,
}: {
  items: RecentTx[]
}) {
  
  const [open, setOpen] = useState(false)  
    
  return (
    <>
      <NewTransactionModal open={open} onOpenChange={setOpen} />
      <Card className="border bg-white rounded-xl border-none">
        <CardHeader className="flex flex-row items-center justify-between px-6 py-5">
          <span className="text-xs font-semibold tracking-wide text-muted-foreground">
            TRANSAÇÕES RECENTES
          </span>

          <Link
            to="/transactions"
            className="flex items-center gap-2 text-sm font-medium text-emerald-700 hover:underline"
          >
            Ver todas <ChevronRight className="h-4 w-4" />
          </Link>
        </CardHeader>

        <CardContent className="px-0 pb-0">
          <div className="divide-y">
            {items.map((tx) => (
              <div key={tx.id} className="grid grid-cols-[56px_1fr_auto_auto_auto] items-center gap-4 px-6 py-5 border-b border-gray-200">
                {/* Icon */}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ backgroundColor: tx.iconBg, color: tx.iconColor }}
                >
                  {tx.icon}
                </div>

                {/* Title + date */}
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-foreground">
                    {tx.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {tx.date}
                  </div>
                </div>

                {/* Category pill */}
                <div className="justify-self-start">
                  <Pill label={tx.category.name} color={tx.category.color} />
                </div>

                {/* Amount */}
                <div className="text-sm font-semibold text-foreground">
                  {tx.type === "income" ? `+ ${tx.amount}` : `- ${tx.amount}`}
                </div>

                {/* Up/Down icon */}
                <div className="justify-self-end">
                  {tx.type === "income" ? (
                    <ArrowUpCircle className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <ArrowDownCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t px-6 py-5 border-gray-200">
            <button
              className="mx-auto flex w-fit items-center gap-2 text-sm font-medium text-emerald-700 hover:underline "
              onClick={() => setOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Nova transação
            </button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}