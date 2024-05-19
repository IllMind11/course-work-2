<script setup lang="ts">
import { Eye, PenBoxIcon, Trash } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'website',
})

const { data: materials, suspense, refetch } = useQuery({
  queryKey: ['materials'],
  queryFn: () => $fetch('/api/materials'),
})
await suspense()

const { mutate: deleteMaterialMutation } = useMutation<number>({
  mutationFn: id => $fetch(`/api/materials/${id}`, {
    method: 'DELETE',
  }),

  onSuccess: () => {
    toast.success('Материал успешно удален')
    refetch()
  },
})
</script>

<template>
  <main class="container">
    <div class="my-8 flex items-center justify-between">
      <h1 class="text-3xl font-bold">
        Материалы
      </h1>

      <Button @click="$router.push('/materials/create')">
        Создать материал
      </button>
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            #
          </TableHead>
          <TableHead>Имя</TableHead>
          <TableHead>Цена</TableHead>
          <TableHead class="text-right">
            Действие
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow v-for="(material, index) in materials" :key="material.id">
          <TableCell class="font-medium">
            {{ index + 1 }}
          </TableCell>
          <TableCell>{{ material.name }}</TableCell>
          <TableCell>{{ material.price }}</TableCell>
          <TableCell class="text-right">
            <button @click="$router.push(`/transactions/${material.id}`)">
              <Eye class="size-5 hover:text-blue-500 mr-3" />
            </button>

            <button @click="$router.push(`/materials/${material.id}`)">
              <PenBoxIcon class="size-5 hover:text-blue-500 mr-3" />
            </button>

            <AlertDialog>
              <AlertDialogTrigger as-child>
                <button>
                  <Trash class="size-5 hover:text-red-500" />
                </button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Это действие не может быть отменено.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                  <AlertDialogAction @click="deleteMaterialMutation(material.id)">
                    Продолжить
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </main>
</template>
