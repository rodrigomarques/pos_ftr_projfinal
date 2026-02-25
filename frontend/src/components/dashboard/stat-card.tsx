import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  icon: ReactNode
  label: string
  value: string
  inverse?: boolean
}

export function StatCard({ icon, label, value, inverse }: StatCardProps) {
  return (
    <Card className="rounded-sm border-none bg-white">
      <CardContent className="p-5">
        <div className={`flex items-center gap-2 font-medium ${inverse ? "text-4xl" : "text-sm text-gray-400"}`}>
          {icon}
          {label}
        </div>

        <div className={`mt-3 font-bold text-foreground ${inverse ? "text-sm text-gray-400" : "text-4xl"}`}>
          {value}
        </div>
      </CardContent>
    </Card>
  )
}