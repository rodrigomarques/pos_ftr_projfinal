"use client"

import { useEffect, useState } from "react"
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

import { useMutation } from "@apollo/client/react"
import { CREATE_CATEGORY, UPDATE_CATEGORY } from "@/lib/graphql/mutations/categories/Index"
import { toast } from "sonner"
import { ICONS } from "@/types"
import type { Category } from "@/pages/Category/Index"
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Categories"

// ================= SCHEMA =================
const schema = z.object({
  title: z.string().min(1, "Informe o título"),
  description: z.string().optional(),
  icon: z.string().min(1, "Selecione um ícone"),
  color: z.string().min(1, "Selecione uma cor"),
})

type FormData = z.infer<typeof schema>

// ================= ICONS =================


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
  refetchCategories?: () => void 
  category?: Category| null
}

export function NewCategoryModal({ open, onOpenChange, refetchCategories, category }: Props) {
  const [selectedIcon, setSelectedIcon] = useState(category?.icon || "")
  const [selectedColor, setSelectedColor] = useState(category?.color || "")

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schema),
  } as const)

  useEffect(() => {
    if (category) {
      reset({
        title: category.name,
        description: category.description,
        icon: category.icon,
        color: category.color,
      })
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedIcon(category.icon)
      setSelectedColor(category.color)
    } else {
      reset({
        title: "",
        description: "",
        icon: "",
        color: "",
      })
      setSelectedIcon("")
      setSelectedColor("")
    }
  }, [category, reset])

  const [updateCategoryMutation] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [LIST_CATEGORIES],
    awaitRefetchQueries: true,
  })
  const [createCategoryMutation, { loading }] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [LIST_CATEGORIES],
    awaitRefetchQueries: true,
  })

  const onSubmit = async (data: FormData) => {
    const variables = {
      name: data.title,
      color: data.color,
      icon: data.icon,
      description: data.description,
    }
    
    if (category?.id) {
      await updateCategoryMutation({
        variables: {
          data: {
            id : category.id,
            ...variables
          }
        },
      })

      toast.success("Categoria atualizada com sucesso!")
    } else {
      await createCategoryMutation({
        variables: {
          data: variables,
        },
      })

      toast.success("Categoria criada com sucesso!")
    }

    onOpenChange(false)
    setValue("title", "")
    setValue("description", "")
    setValue("icon", "")
    setValue("color", "")
    setSelectedIcon("")
    setSelectedColor("")

    if (refetchCategories) {
      refetchCategories()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
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
            disabled={loading}
          >
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}