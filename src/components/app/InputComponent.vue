<script lang="ts" setup>

import {Input} from "@/components/ui/input";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

defineProps<{
  label: string,
  description?: string,
  name: string,
}>()

</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem>
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <Input autocomplete="off"
               type="text" v-bind="componentField"/>
      </FormControl>
      <FormDescription>
        {{ description }}
      </FormDescription>
      <FormMessage/>
    </FormItem>
  </FormField>
</template>
