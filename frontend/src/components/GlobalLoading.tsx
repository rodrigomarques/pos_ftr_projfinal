import { Loader2 } from "lucide-react"

type Props = {
  open: boolean
  text?: string
}

export function GlobalLoading({ open, text = "Carregando..." }: Props) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 rounded-lg px-6 py-5 flex flex-col items-center gap-3 shadow-lg">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  )
}