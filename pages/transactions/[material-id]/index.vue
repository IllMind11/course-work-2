<script setup lang="ts">
import { PenBoxIcon, Trash } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'website',
})

const route = useRoute('/materials/transactions/:material-id')

const { data: transactionsData, suspense, refetch } = useQuery({
  queryKey: ['transactions', route.params.materialid],
  queryFn: () => $fetch(`/api/transactions/${route.params.materialid}`),

  gcTime: 0,
  staleTime: 0,
})
await suspense()

const { mutate: deleteTransactionMutation } = useMutation<number>({
  mutationFn: id => $fetch(`/api/transactions/${id}`, {
    method: 'DELETE',
  }),

  onSuccess: () => {
    toast.success('Транзакция успешно удалена')
    refetch()
  },
})
</script>

<template>
  <main class="container">
    <div class="my-8 flex items-center justify-between">
      <h1 class="text-3xl font-bold">
        Транзакции - {{ transactionsData?.material?.name }}
      </h1>

      <Button @click="$router.push(`/transactions/${route.params.materialid}/create`)">
        Создать транзакцию
      </button>
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            #
          </TableHead>
          <TableHead class="text-xs">
            Год
          </TableHead>
          <TableHead class="text-xs">
            Месяц
          </TableHead>
          <TableHead class="text-xs">
            Остатки на начало месяца
          </TableHead>
          <TableHead class="text-xs">
            Остатки на конец месяца
          </TableHead>
          <TableHead class="text-xs">
            Поступления от подотчетного лица
          </TableHead>
          <TableHead class="text-xs">
            С центрального склада
          </TableHead>
          <TableHead class="text-xs">
            Выдачи в производство
          </TableHead>

          <TableHead class="text-right">
            Действие
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow v-for="(transaction, index) in transactionsData?.transactions" :key="transaction.id">
          <TableCell class="font-medium">
            {{ index + 1 }}
          </TableCell>
          <TableCell>{{ transaction.year }}</TableCell>
          <TableCell>{{ transaction.month }}</TableCell>
          <TableCell>{{ transaction.startingBalance }}</TableCell>
          <TableCell>{{ transaction.endingBalance }}</TableCell>
          <TableCell>{{ transaction.receiptsAccountable }}</TableCell>
          <TableCell>{{ transaction.receiptsWarehouse }}</TableCell>
          <TableCell>{{ transaction.issuesProduction }}</TableCell>
          <TableCell class="text-right">
            <button @click="$router.push(`/transactions/${transactionsData?.material.id}/edit/${transaction.id}`)">
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
                  <AlertDialogAction @click="deleteTransactionMutation(transaction.id)">
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
