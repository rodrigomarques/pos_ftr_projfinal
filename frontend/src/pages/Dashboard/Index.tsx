import { CategoriesCard } from "@/components/dashboard/categories-card";
import { RecentTransactionsCard } from "@/components/dashboard/recent-transactions-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { Page } from "@/components/Page";
import { ArrowDownCircle, ArrowUpCircle, Banknote, Car, PiggyBank, ShoppingCart, Utensils, Wallet } from "lucide-react";

export function Dashboard() {

  const recent = [
    {
      id: "1",
      title: "Pagamento de Salário",
      date: "01/12/25",
      category: { name: "Receita", color: "#16a34a" },
      amount: "R$ 4.250,00",
      type: "income" as const,
      icon: <Banknote className="h-5 w-5" />,
      iconBg: "#dcfce7",
      iconColor: "#16a34a",
    },
    {
      id: "2",
      title: "Jantar no Restaurante",
      date: "30/11/25",
      category: { name: "Alimentação", color: "#2563eb" },
      amount: "R$ 89,50",
      type: "expense" as const,
      icon: <Utensils className="h-5 w-5" />,
      iconBg: "#dbeafe",
      iconColor: "#2563eb",
    },
    {
      id: "3",
      title: "Posto de Gasolina",
      date: "29/11/25",
      category: { name: "Transporte", color: "#7c3aed" },
      amount: "R$ 100,00",
      type: "expense" as const,
      icon: <Car className="h-5 w-5" />,
      iconBg: "#ede9fe",
      iconColor: "#7c3aed",
    },
    {
      id: "4",
      title: "Compras no Mercado",
      date: "28/11/25",
      category: { name: "Mercado", color: "#ea580c" },
      amount: "R$ 156,80",
      type: "expense" as const,
      icon: <ShoppingCart className="h-5 w-5" />,
      iconBg: "#ffedd5",
      iconColor: "#ea580c",
    },
    {
      id: "5",
      title: "Retorno de Investimento",
      date: "26/11/25",
      category: { name: "Investimento", color: "#16a34a" },
      amount: "R$ 340,25",
      type: "income" as const,
      icon: <PiggyBank className="h-5 w-5" />,
      iconBg: "#dcfce7",
      iconColor: "#16a34a",
    },
  ]

  const categories = [
    { id: "c1", name: "Alimentação", items: 12, value: "R$ 542,30", color: "#2563eb" },
    { id: "c2", name: "Transporte", items: 8, value: "R$ 385,50", color: "#7c3aed" },
    { id: "c3", name: "Mercado", items: 3, value: "R$ 298,75", color: "#ea580c" },
    { id: "c4", name: "Entretenimento", items: 2, value: "R$ 186,20", color: "#db2777" },
    { id: "c5", name: "Utilidades", items: 7, value: "R$ 245,80", color: "#ca8a04" },
  ]

  
  return (
    <Page >
      <div className="space-y-6 p-6 bg-muted/40 min-h-screen">
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            icon={<Wallet className="h-6 w-6 text-violet-500" />}
            label="SALDO TOTAL"
            value="R$ 12.847,32"
          />

          <StatCard
            icon={<ArrowUpCircle className="h-6 w-6 text-emerald-600" />}
            label="RECEITAS DO MÊS"
            value="R$ 4.250,00"
          />

          <StatCard
            icon={<ArrowDownCircle className="h-6 w-6 text-red-500" />}
            label="DESPESAS DO MÊS"
            value="R$ 2.180,45"
          />
        </div>


      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <RecentTransactionsCard items={recent} />
        <CategoriesCard rows={categories} />
      </div>

      
      </div>
    </Page>
  )
}