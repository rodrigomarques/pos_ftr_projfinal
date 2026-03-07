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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react"
import { CREATE_TRANSACTION } from "@/lib/graphql/mutations/transactions/Index"
import { useMutation, useQuery } from "@apollo/client/react"
import { toast } from "sonner"
import type { Category } from "@/types"
import { LIST_CATEGORIES, LIST_CATEGORIES_SELECT } from "@/lib/graphql/queries/Categories"

// ================= SCHEMA =================
const schema = z.object({
  description: z.string().min(1, "Informe a descrição"),
  date: z.string().min(1, "Informe a data"),
  amount: z.string().min(1, "Informe o valor"),
  category: z.string().min(1, "Selecione a categoria"),
  type: z.enum(["expense", "income"]),
})

type FormData = z.infer<typeof schema>

// ================= COMPONENT =================
interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewTransactionModal({ open, onOpenChange }: Props) {
  const [type, setType] = useState<"expense" | "income">("expense")

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "expense",
    },
  })

  const { data} = useQuery<{ listCategories: Category[] }>(LIST_CATEGORIES_SELECT)
  const listCategories = data?.listCategories || []

  const [createTransactionMutation, { loading }] = useMutation(CREATE_TRANSACTION)
  
  const onSubmit = async (data: FormData) => {
    const dataVal = new Date(data.date)
    const amount = Number(data.amount.replace(",", "."))

    const variables = {
      title: data.description,
      amount: amount,
      date: dataVal.toISOString(),
      type: data.type.toUpperCase(),
      categoryId: data.category,
    }

    console.log(variables)
    await createTransactionMutation({
      variables: {
        data: variables,
      },
    })

    toast.success("Transação criada com sucesso!")
    

    onOpenChange(false)
    setValue("amount", "")
    setValue("description", "")
    setValue("date", "")
    setValue("type", "income")
    setValue("category", "")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-none rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Nova transação</DialogTitle>
          <DialogDescription>
            Registre sua despesa ou receita
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Toggle tipo */}
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1">
            <button
              type="button"
              onClick={() => {
                setType("expense")
                setValue("type", "expense")
              }}
              className={`
                flex items-center justify-center gap-2
                rounded-md py-2 text-sm font-medium
                transition-all
                border
                focus:outline-none
                focus:ring-0
                focus-visible:ring-0
                focus-visible:ring-offset-0
                ${
                  type === "expense"
                    ? "bg-white text-red-600 border-red-500 shadow-sm"
                    : "text-muted-foreground border-transparent hover:bg-white/60"
                }
              `}
            >
              <ArrowDownCircle className="h-4 w-4" />
              Despesa
            </button>

            <button
              type="button"
              onClick={() => {
                setType("income")
                setValue("type", "income")
              }}
              className={`
                flex items-center justify-center gap-2
                rounded-md py-2 text-sm font-medium
                transition-all
                border
                ${
                  type === "income"
                    ? "bg-white text-emerald-600 border-emerald-500 shadow-sm"
                    : "text-muted-foreground border-transparent hover:bg-white/60"
                }
              `}
            >
              <ArrowUpCircle className="h-4 w-4" />
              Receita
            </button>
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Descrição</label>
            <Input
              placeholder="Ex. Almoço no restaurante"
              className="border-gray-300
                  focus:outline-none
                  focus:ring-0
                  focus-visible:ring-0
                  focus-visible:ring-offset-0"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Data + Valor */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Data</label>
              <Input type="date" className="border-gray-300
                  focus:outline-none
                  focus:ring-0
                  focus-visible:ring-0
                  focus-visible:ring-offset-0" {...register("date")} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Valor</label>

              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  R$
                </span>

                <Input
                  placeholder="0,00"
                  className="pl-9 border-gray-300
                    focus:outline-none
                    focus:ring-0
                    focus-visible:ring-0
                    focus-visible:ring-offset-0"
                  {...register("amount")}
                />
              </div>

              {errors.amount && (
                <p className="text-xs text-red-500">
                  {errors.amount.message}
                </p>
              )}
            </div>
          </div>

          {/* Categoria */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Categoria</label>

            <Select onValueChange={(v) => setValue("category", v)}>
              <SelectTrigger className="
                    min-h-11
                    w-full
                    justify-between
                    rounded-md
                    border border-input
                    bg-white
                    shadow-sm
                    hover:bg-accent/30
                    focus:outline-none
                    focus:ring-0
                    focus-visible:ring-0
                    focus-visible:ring-offset-0
                    border-gray-200
                  ">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent position="popper"
                  side="bottom"
                  align="start"
                  sideOffset={4}
                  className="min-w-[--radix-select-trigger-width] rounded-md border bg-white p-1 shadow-md border-gray-200">
                  {listCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            {errors.category && (
              <p className="text-xs text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white"
          >
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}