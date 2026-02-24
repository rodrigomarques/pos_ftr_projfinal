import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

export interface CategoryRow {
  id: string
  name: string
  items: number
  value: string
  color: string
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

export function CategoriesCard({ rows }: { rows: CategoryRow[] }) {
  return (
    <Card className="border bg-white rounded-xl">
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
          {rows.map((c) => (
            <div key={c.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-4">
              <div className="flex items-center gap-3">
                <Pill label={c.name} color={c.color} />
              </div>

              <div className="text-xs text-muted-foreground">
                {c.items} itens
              </div>

              <div className="text-sm font-semibold text-foreground">
                {c.value}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}