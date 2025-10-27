<script lang="ts" setup>

import type {ToastCloseProps} from "reka-ui";
import type {HTMLAttributes} from "vue";
import {cn} from "@/lib/utils";

const props = defineProps<ToastCloseProps & {
  text: string
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
      :class="cn('my-6 mb-12 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border', props.class)">
      <span class="relative z-10 bg-background px-2 text-muted-foreground">
        {{ text }}
      </span>
  </div>
</template>

<style scoped>

</style>