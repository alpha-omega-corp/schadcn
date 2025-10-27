<script lang="ts" setup xmlns="http://www.w3.org/1999/html">

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
  label?: string,
  type?: string,
  description?: string,
  name: string,
  autocomplete?: boolean
}>()

</script>

<template>
  <FormField v-if="type != 'number'" v-slot="{ componentField }" :name="name" :validate-on-blur="false">
    <FormItem class="flex-1">
      <div class="flex items-center">
        <FormLabel>{{ label }}</FormLabel>
        <slot></slot>
      </div>
      <FormControl>
        <Input :autocomplete="autocomplete ?? 'on'"
               :type="type" v-bind="componentField"/>
      </FormControl>
      <FormDescription v-if="description">
        {{ description }}
      </FormDescription>
      <FormMessage class="text-xs   "/>
    </FormItem>
  </FormField>

  <FormField v-else v-slot="{ componentField }" :name="name" :validate-on-blur="false">
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
