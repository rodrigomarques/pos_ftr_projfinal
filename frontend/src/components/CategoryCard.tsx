
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/Badge"
import type { Category } from "@/pages/Category/Index"
import { Button } from "./ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { ICONS } from "@/types"


export function CategoryCard({ category }: { category: Category }) {
  const Icon = ICONS.find(
    (icon) => icon.name === (typeof category.icon === "string" ? category.icon : "")
  )?.Icon;

  return (
    <Card className="rounded-xl border-none bg-white">
      <CardContent className="pl-5 pr-5 space-y-3">
        {/* header */}
        <div className="flex items-start justify-between">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            style={{
              backgroundColor: category.color,
              color: "#fff",
            }}
          >
            {Icon && <Icon className="h-4 w-4" />}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-9 w-9 border-gray-200">
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 border-gray-200">
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* title */}
        <div className="pb-10">
          <div className="text-sm font-semibold">{category.name}</div>
          <div className="text-xs text-muted-foreground">
            {category.description}
          </div>
        </div>

        {/* footer */}
        <div className="flex items-center justify-between">
          <Badge label={category.name} color={category.color} />
          <span className="text-xs text-muted-foreground">
            {category.items} {category.items === 1 ? "item" : "itens"}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
