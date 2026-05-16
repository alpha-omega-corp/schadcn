<script lang="ts" setup>
defineProps<{
  title: string,
  description: string
}>()
</script>

<template>
  <div class="max-w-7xl mx-auto text-center">
    <h2 class="md:text-5xl font-bold text-slate-700 mb-6 leading-tight">
      {{ title }}
    </h2>

    <div class="p-4">
      <p class="text-xl text-slate-500 mb-8 max-w-2xl mx-auto">
        {{ description }}
      </p>
    </div>

  </div>
</template>

<style scoped>

</style>