<script lang="ts" setup>
import type {HTMLAttributes} from "vue"
import {cn} from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
      :class="cn('@container/card-header px-6', props.class)"
      data-slot="card-header"
  >
    <slot/>
  </div>
</template>
