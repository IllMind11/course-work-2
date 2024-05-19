<script setup lang="ts">
import { NotebookText } from 'lucide-vue-next'
</script>

<template>
  <header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-10">
    <div class="container flex items-center gap-4">
      <nav class="flex items-center gap-4 justify-between w-full">
        <NuxtLink
          to="/"
          class="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <NotebookText class="h-6 w-6" />
          <span class="sr-only">Acme Inc</span>
        </NuxtLink>

        <div class="flex items-center gap-5">
          <NuxtLink to="/" class="[&.router-link-active]:text-blue-500">
            Материалы
          </NuxtLink>
        </div>
      </nav>
    </div>
  </header>
</template>
