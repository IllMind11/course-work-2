<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <NuxtLoadingIndicator />
  <Toaster close-button rich-colors />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
