<script lang="ts" setup>
import type {LabelProps} from "reka-ui"
import type {HTMLAttributes} from "vue"
import {cn} from "@/lib/utils"
import {Label} from '@/components/ui/label'
import {useFormField} from "./useFormField"

const props = defineProps<LabelProps & { class?: HTMLAttributes["class"] }>()

const {error, formItemId} = useFormField()
</script>

<template>
  <Label
      :class="cn(
      props.class,
    )"
      :data-error="!!error"
      :for="formItemId"
      data-slot="form-label"
  >
    <slot/>
  </Label>
</template>

<style scoped>
/* Append an asterisk when data-required="true" is present on the label */
[data-slot="form-label"][data-required="true"]::after {
  content: "*";
  margin-left: 0.125rem; /* ~2px */
}
</style>
