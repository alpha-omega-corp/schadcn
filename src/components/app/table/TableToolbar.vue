<script lang="ts" setup>

import {computed} from 'vue'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {ChevronDown} from "lucide-vue-next";
import {Button} from "@/components/ui/button";
import {Table} from "@tanstack/vue-table";

interface DataTableToolbarProps {
  table: Table<any>
}

const props = defineProps<DataTableToolbarProps>()

const globalFilter = computed<string>({
  get: () => String(props.table.getState().globalFilter ?? ''),
  set: (val) => props.table.setGlobalFilter(val)
})

</script>

<template>
  <div class="flex justify-between gap-4 mb-5">
    <Input
        v-model="globalFilter"
        class="border rounded px-3 py-2 text-sm"
        placeholder="Search..."
        type="text"
    />
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button class="ml-auto" variant="outline">
            Columns
            <ChevronDown class="w-4 h-4 ml-2"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
              v-for="column in table.getAllColumns().filter((column) => column.getCanHide())" :key="column.id"
              :modelValue="column.getIsVisible()" class="capitalize" @update:modelValue="(value) => {
                            column.toggleVisibility(value)
                        }">
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>

<style scoped>

</style>