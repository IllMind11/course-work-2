<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'website',
})

interface Material {
  name: string
  price: number
}

const router = useRouter()
const route = useRoute('/transactions/:material-id/create')

const formSchema = toTypedSchema(z.object({
  year: z.coerce.number().min(1900).max(2100),
  month: z.coerce.number().min(1).max(12),
  startingBalance: z.coerce.number().min(0),
  endingBalance: z.coerce.number().min(0),
  receiptsAccountable: z.coerce.number().min(0),
  receiptsWarehouse: z.coerce.number().min(0),
  issuesProduction: z.coerce.number().min(0),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

function getMonthName(index: number) {
  return new Date(new Date().getFullYear(), index).toLocaleString('ru-RU', { month: 'long' })
}

const { mutate: createMaterialMutation } = useMutation<Material>({
  mutationFn: data => $fetch('/api/transactions', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  onSuccess: () => {
    toast.success('Транзакция успешно создана')
    router.push(`/transactions/${route.params.materialid}`)
  },
})

const onSubmit = handleSubmit((values) => {
  createMaterialMutation({
    ...values,
    materialId: route.params.materialid,
  })
})
</script>

<template>
  <main class="container">
    <h1 class="my-8 text-3xl font-bold">
      Создание транзакции
    </h1>

    <form class="w-2/3 flex flex-col gap-4" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="year">
        <FormItem>
          <FormLabel>Год</FormLabel>

          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="i in Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i)"
                  :key="i"
                  :value="i.toString()"
                >
                  {{ i }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="month">
        <FormItem>
          <FormLabel>Месяц</FormLabel>

          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="i in Array.from({ length: 12 }, (_, i) => i)"
                  :key="i"
                  :value="(i + 1).toString()"
                >
                  {{ getMonthName(i) }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="startingBalance">
        <FormItem>
          <FormLabel>Остатки на начало месяца</FormLabel>
          <FormControl>
            <Input type="number" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="endingBalance">
        <FormItem>
          <FormLabel>Остатки на конец месяца</FormLabel>
          <FormControl>
            <Input type="number" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="receiptsAccountable">
        <FormItem>
          <FormLabel>Поступления от подотчетного лица</FormLabel>
          <FormControl>
            <Input type="number" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="receiptsWarehouse">
        <FormItem>
          <FormLabel>С центрального склада</FormLabel>
          <FormControl>
            <Input type="number" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="issuesProduction">
        <FormItem>
          <FormLabel>Выдачи в производство</FormLabel>
          <FormControl>
            <Input type="number" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button class="mt-6 w-fit" type="submit">
        Создать
      </Button>
    </form>
  </main>
</template>
