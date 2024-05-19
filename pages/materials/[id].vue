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
const route = useRoute('/materials/:id')

const { data: material, suspense } = useQuery({
  queryKey: ['materials', route.params.id],
  queryFn: () => $fetch(`/api/materials/${route.params.id}`),
})
await suspense()

const formSchema = toTypedSchema(z.object({
  name: z.string().min(1, 'Минимум 1 символ'),
  price: z.coerce.number().min(1, 'Минимум 1 рубль'),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: material.value?.name || '',
    price: material.value?.price || 0,
  },
})

const { mutate: createMaterialMutation } = useMutation<Material>({
  mutationFn: data => $fetch(`/api/materials/${route.params.id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  }),

  onSuccess: () => {
    toast.success('Материал успешно изменен')
    router.push('/')
  },
})

const onSubmit = handleSubmit((values) => {
  createMaterialMutation(values as any)
})
</script>

<template>
  <main class="container">
    <h1 class="my-8 text-3xl font-bold">
      Изменение материала
    </h1>

    <form class="w-2/3 flex flex-col gap-4" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Имя</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="price">
        <FormItem>
          <FormLabel>Цена</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button class="mt-6 w-fit" type="submit">
        Сохранить
      </Button>
    </form>
  </main>
</template>
