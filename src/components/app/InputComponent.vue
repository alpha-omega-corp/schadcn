<script lang="ts" setup>

import {Input} from "@/components/ui/input";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput
} from "@/components/ui/number-field";

defineProps<{
  label: string,
  type?: string,
  description?: string,
  name: string,
}>()

</script>

<template>
  <FormField v-if="type != 'number'" v-slot="{ componentField }" :name="name">
    <FormItem class="flex-1">
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <Input :type="type"
               autocomplete="off" v-bind="componentField"/>
      </FormControl>
      <FormDescription>
        {{ description }}
      </FormDescription>
      <FormMessage/>
    </FormItem>
  </FormField>

  <FormField v-else v-slot="{ componentField }" :name="name">
    <FormItem class="flex-1">
      <FormLabel>{{ label }}</FormLabel>
      <NumberField
          :min="0"
          :model-value="componentField.modelValue"
          @update:model-value="(v) => {
            componentField['onUpdate:modelValue'](v ? Number(v) : null)
          }"
      >
        <NumberFieldContent>
          <NumberFieldDecrement/>
          <FormControl>
            <NumberFieldInput/>
          </FormControl>
          <NumberFieldIncrement/>
        </NumberFieldContent>
      </NumberField>
      <FormDescription>
        {{ description }}
      </FormDescription>
      <FormMessage/>
    </FormItem>
  </FormField>
</template>
