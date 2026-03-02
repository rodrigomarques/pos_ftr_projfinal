"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ShoppingBag,
  Car,
  Heart,
  PiggyBank,
  ShoppingCart,
  Ticket,
  Gift,
  Utensils,
  Sparkles,
  Home,
  Package,
  BookOpen,
  Dumbbell,
  Bus,
  CreditCard,
  Receipt,
} from "lucide-react"

// ================= SCHEMA =================
const schema = z.object({
  title: z.string().min(1, "Informe o título"),
  description: z.string().optional(),
  icon: z.string().min(1, "Selecione um ícone"),
  color: z.string().min(1, "Selecione uma cor"),
})

type FormData = z.infer<typeof schema>

// ================= ICONS =================
const ICONS = [
  { name: "bag", Icon: ShoppingBag },
  { name: "car", Icon: Car },
  { name: "heart", Icon: Heart },
  { name: "pig", Icon: PiggyBank },
  { name: "cart", Icon: ShoppingCart },
  { name: "ticket", Icon: Ticket },
  { name: "gift", Icon: Gift },
  { name: "food", Icon: Utensils },
  { name: "spark", Icon: Sparkles },
  { name: "home", Icon: Home },
  { name: "box", Icon: Package },
  { name: "book", Icon: BookOpen },
  { name: "gym", Icon: Dumbbell },
  { name: "bus", Icon: Bus },
  { name: "card", Icon: CreditCard },
  { name: "receipt", Icon: Receipt },
]

// ================= COLORS =================
const COLORS = [
  "#16a34a",
  "#2563eb",
  "#7c3aed",
  "#db2777",
  "#dc2626",
  "#ea580c",
  "#ca8a04",
]

// ================= COMPONENT =================
interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewCategoryModal({ open, onOpenChange }: Props) {
  const [selectedIcon, setSelectedIcon] = useState("")
  const [selectedColor, setSelectedColor] = useState("")

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-none rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle>Nova categoria</DialogTitle>
          <DialogDescription>
            Organize suas transações com categorias
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* título */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Título</label>
            <Input
              placeholder="Ex. Alimentação"
              className="h-11 border-gray-300 focus-visible:ring-0"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* descrição */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Descrição</label>
            <Input
              placeholder="Descrição da categoria"
              className="h-11 border-gray-300 focus-visible:ring-0"
              {...register("description")}
            />
            <span className="text-xs text-muted-foreground">Opcional</span>
          </div>

          {/* ícones */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground lowercase">
              ícone
            </label>

            <div className="grid grid-cols-8 gap-2">
              {ICONS.map(({ name, Icon }) => {
                const active = selectedIcon === name

                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      setSelectedIcon(name)
                      setValue("icon", name)
                    }}
                    className={`
                      h-10 w-10 rounded-lg border flex items-center justify-center
                      transition-all
                      ${
                        active
                          ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                          : "border-gray-200 text-gray-500 hover:bg-gray-50"
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                )
              })}
            </div>

            {errors.icon && (
              <p className="text-xs text-red-500">{errors.icon.message}</p>
            )}
          </div>

          {/* cores */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Cor
            </label>

            <div className="flex gap-2 flex-wrap">
              {COLORS.map((color) => {
                const active = selectedColor === color

                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      setSelectedColor(color)
                      setValue("color", color)
                    }}
                    className={`
                      h-8 w-10 rounded-md border relative
                      ${active ? "border-gray-400" : "border-gray-200"}
                    `}
                    style={{ backgroundColor: color }}
                  >
                    {active && (
                      <span className="absolute inset-1 rounded-sm border-2 border-white" />
                    )}
                  </button>
                )
              })}
            </div>

            {errors.color && (
              <p className="text-xs text-red-500">{errors.color.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-11 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg"
          >
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}