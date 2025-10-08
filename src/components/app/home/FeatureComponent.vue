<script lang="ts" setup>
import type {LucideIcon} from "lucide-vue-next"

defineProps<{
  title: string,
  description: string,
  icon: LucideIcon
}>()
</script>

<template>
  <div class="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
    <div class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
      <component :is="icon" :class="$attrs.class" class="size-6"/>
    </div>
    <div class="flex-1">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">
        {{ title }}
      </h3>
      <p class="text-gray-600">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>