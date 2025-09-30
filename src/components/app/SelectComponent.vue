<script lang="ts" setup>
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {DataSelect} from "@/models/app/data";

defineProps<{
  label: string,
  data: DataSelect[],
}>()

</script>

<template>
  <Select>
    <SelectTrigger class="w-[180px]">
      <SelectValue placeholder="Select a fruit"/>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{{ label }}</SelectLabel>
        <template v-for="item in data">
          <SelectItem :value="item.id">
            item.value
          </SelectItem>
        </template>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>