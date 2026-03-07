import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChevronRight, Plus, ArrowDownCircle, ArrowUpCircle } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { NewTransactionModal } from "@/components/NewTransactionModal"
import type { Transaction } from "@/pages/Transaction/Index"
import { ICONS } from "@/types"
import { Pill } from "../Pill"

export function RecentTransactionsCard({
  items,
}: {
  items: Transaction[]
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
                  style={{ backgroundColor: tx.category.color, color: "#fff" }}
                >
                  {(() => {
                    const icon = ICONS.find(
                          (icon) => icon.name === (typeof tx.category.icon === "string" ? tx.category.icon : "")
                        )
                    return icon?.Icon ? <icon.Icon className="h-6 w-6" /> : null
                  })()}
                </div>

                {/* Title + date */}
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-foreground">
                    {tx.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {
                      new Date(tx.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    }
                  </div>
                </div>

                <div className="justify-self-start">
                  <Pill label={tx.category.name} color={tx.category.color} />
                </div>

                {/* Amount */}
                <div className="text-sm font-semibold text-foreground">
                  {tx.type === "INCOME"
                    ? `+ R$ ${Number(tx.amount).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : `- R$ ${Number(tx.amount).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`}
                </div>

                {/* Up/Down icon */}
                <div className="justify-self-end">
                  {tx.type === "INCOME" ? (
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