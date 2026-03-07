import { CategoriesCard } from "@/components/dashboard/categories-card";
import { RecentTransactionsCard } from "@/components/dashboard/recent-transactions-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { Page } from "@/components/Page";
import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";
import type { Transaction } from "../Transaction/Index";
import { useQuery } from "@apollo/client/react";
import { LIST_TRANSACTIONS_DASH } from "@/lib/graphql/queries/Transactions";
import type { Category } from "../Category/Index";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Categories";
import { useMemo, useState } from "react";
import { currencyBRL } from "@/utils/currency";

export function Dashboard() {

  const [period, _] = useState(() => {
    const now = new Date()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const year = now.getFullYear()
    return `${month}/${year}`
  })

  const { data } = useQuery<{ listTransactions: { data: Transaction[] } }>(
    LIST_TRANSACTIONS_DASH,
    {
      variables: {
        filters: {
          ...(period && { period }),
        }
      },
    }
  )
  const listTransactions = useMemo(() => data?.listTransactions.data || [], [data])

  const receita = useMemo(() => 
    listTransactions.filter(tx => tx.type === "INCOME").reduce((acc, tx) => acc + Number(tx.amount), 0),
    [listTransactions]
  )
  
  const despesa = useMemo(() =>
    listTransactions.filter(tx => tx.type === "EXPENSE").reduce((acc, tx) => acc + Number(tx.amount), 0),
    [listTransactions]
  )

  const resumoPorCategoria = useMemo(() => {
    const map = listTransactions.reduce((acc, tx) => {
      const categoryId = tx.category.id

      if (!acc[categoryId]) {
        acc[categoryId] = {
          categoryId,
          somaValor: 0,
          totalItens: 0,
        }
      }

      if(tx.type === "INCOME") {
        acc[categoryId].somaValor += Number(tx.amount)
      }else{
        acc[categoryId].somaValor -= Number(tx.amount)
      }
      acc[categoryId].totalItens += 1

      return acc
    }, {} as Record<string, { categoryId: string; somaValor: number; totalItens: number }>)

    return Object.values(map)
  }, [listTransactions])

  const { data:dataCategory } = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES)
  const listCategories = dataCategory?.listCategories || []
  
  return (
    <Page >
      <div className="space-y-6 p-6 bg-muted/40 min-h-screen">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            icon={<Wallet className="h-6 w-6 text-violet-500" />}
            label="SALDO TOTAL"
            value={`${currencyBRL(receita - despesa)}`}
          />

          <StatCard
            icon={<ArrowUpCircle className="h-6 w-6 text-emerald-600" />}
            label="RECEITAS DO MÊS"
            value={`${currencyBRL(receita)}`}
          />

          <StatCard
            icon={<ArrowDownCircle className="h-6 w-6 text-red-500" />}
            label="DESPESAS DO MÊS"
            value={`${currencyBRL(despesa)}`}
          />
        </div>


      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <RecentTransactionsCard items={listTransactions} />
        <CategoriesCard rows={listCategories} resumoPorCategoria={resumoPorCategoria} />
      </div>

      
      </div>
    </Page>
  )
}