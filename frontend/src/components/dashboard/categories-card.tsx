import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Category } from "@/pages/Category/Index"
import { ArrowDownCircle, ArrowUpCircle, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { Pill } from "../Pill";
import { currencyBRL } from "@/utils/currency";

export function CategoriesCard({ rows, resumoPorCategoria }: { rows: Category[], resumoPorCategoria: { categoryId: string; somaValor: number; totalItens: number }[] }) {
  return (
    <Card className="border bg-white rounded-xl border-none">
      <CardHeader className="flex flex-row items-center justify-between px-6 py-5">
        <span className="text-xs font-semibold tracking-wide text-muted-foreground">
          CATEGORIAS
        </span>

        <Link
          to="/categories"
          className="flex items-center gap-2 text-sm font-medium text-emerald-700 hover:underline"
        >
          Gerenciar <ChevronRight className="h-4 w-4" />
        </Link>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <div className="space-y-4">
          {rows.map((c) => {
            const resumo = resumoPorCategoria.find(
              (r) => r.categoryId === c.id
            )

            return (
              <div
                key={c.id}
                className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4"
              >
                <div className="flex items-center gap-3">
                  <Pill label={c.name} color={c.color} />
                </div>

                <div className="text-xs text-muted-foreground">
                  {resumo?.totalItens ?? 0} itens
                </div>

                <div className="text-sm font-semibold text-foreground">
                  {currencyBRL(resumo?.somaValor ?? 0)}
                </div>
                
                <div className="justify-self-end">
                  {resumo?.somaValor && resumo.somaValor > 0 ? (
                    <ArrowUpCircle className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <ArrowDownCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}