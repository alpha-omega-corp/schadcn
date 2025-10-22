<script lang="ts" setup>
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {DataSelect} from "@/models/app/data";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {computed, ref, watch, nextTick} from "vue";

const props = defineProps<{
  label: string,
  name: string,
  description?: string,
  data: DataSelect[],
  modelValue?: number | string | undefined,
}>()

// String value for the hidden input (so z.coerce.number can parse it reliably)
const stringModelValue = computed(() =>
  props.modelValue === undefined || props.modelValue === null || props.modelValue === ''
    ? ''
    : String(Number(props.modelValue))
)

// Hidden input ref so we can trigger an input event when modelValue is pre-filled
const hiddenInputEl = ref<HTMLInputElement | null>(null)

function syncFormFieldFromModel() {
  const el = hiddenInputEl.value
  if (!el) return
  // Only sync when we actually have a pre-filled value
  if (stringModelValue.value === '') return
  el.value = stringModelValue.value as any
  // Dispatch events so vee-validate updates its internal value when pre-filled
  el.dispatchEvent(new Event('input', { bubbles: true }))
  el.dispatchEvent(new Event('change', { bubbles: true }))
}

// When a pre-defined value arrives, initialize the form field value after mount to ensure registration
watch(() => props.modelValue, async () => {
  await nextTick()
  syncFormFieldFromModel()
}, { immediate: true })

</script>

<template>

  <FormField v-slot="{ componentField }" :name="name">
    <FormItem class="flex-1">
      <FormLabel>{{ label }}</FormLabel>

      <Select
        :model-value="componentField.modelValue === undefined || componentField.modelValue === null ? undefined : String(componentField.modelValue)"
        @update:model-value="(v) => componentField['onUpdate:modelValue']?.(v === undefined ? undefined : Number(v))"
      >
        <FormControl>
          <!-- Hidden input registers the field and initializes vee-validate when pre-filled -->
          <input ref="hiddenInputEl" hidden type="text" v-bind="componentField">
          <SelectTrigger class="w-full">
            <SelectValue :placeholder="description"/>
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup>
            <template v-for="item in data" :key="item.id">
              <SelectItem :value="String(item.id)">
                {{ item.name }}
              </SelectItem>
            </template>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FormMessage/>
    </FormItem>
  </FormField>
</template>