import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  icon: ReactNode
  label: string
  value: string
}

export function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <Card className="rounded-sm border-none bg-white">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
          {icon}
          {label}
        </div>

        <div className="mt-3 text-4xl font-bold text-foreground">
          {value}
        </div>
      </CardContent>
    </Card>
  )
}