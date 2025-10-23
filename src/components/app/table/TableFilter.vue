<script lang="ts" setup>
import type {Column} from '@tanstack/vue-table'
import {computed, ref} from 'vue'
import {CheckIcon, PlusIcon} from 'lucide-vue-next'
import {cn} from '@/lib/utils'
import {Badge} from '@/components/ui/badge'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import {Popover, PopoverContent, PopoverTrigger,} from '@/components/ui/popover'
import {Separator} from '@/components/ui/separator'
import {Button} from "@/components/ui/button";
import {DataSelect} from "@/models/app/data";

interface DataTableFacetedFilter {
  column?: Column<any, any>
  title?: string
  options: DataSelect[]
}

const props = defineProps<DataTableFacetedFilter>()

const facets = computed(() => props.column?.getFacetedUniqueValues())
const selectedValues = computed(() => new Set(props.column?.getFilterValue() as string[]))

const open = ref(false)
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button class="h-8 border-dashed" size="sm" variant="outline">
        <PlusIcon class="mr-2 h-4 w-4"/>
        {{ title }}
        <template v-if="selectedValues.size > 0">
          <Separator class="mx-2 h-4" orientation="vertical"/>
          <Badge
              class="rounded-sm px-1 font-normal lg:hidden"
              variant="secondary"
          >
            {{ selectedValues.size }}
          </Badge>
          <div class="hidden space-x-1 lg:flex">
            <Badge
                v-if="selectedValues.size > 2"
                class="rounded-sm px-1 font-normal"
                variant="secondary"
            >
              {{ selectedValues.size }} selected
            </Badge>

            <template v-else>
              <Badge
                  v-for="option in options
                  .filter((option) => selectedValues.has(option.name))"
                  :key="option.id"
                  class="rounded-sm px-1 font-normal"
                  variant="secondary"
              >
                {{ option.name }}
              </Badge>
            </template>
          </div>
        </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent align="start" class="w-[200px] p-0">
      <Command>
        <CommandInput :placeholder="title"/>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
                v-for="option in options"
                :key="option.id"
                :value="option.name"
                class="p-2"
                @select="(e) => {
                const value = e.detail.value as string
                const isSelected = selectedValues.has(value)
                if (isSelected) {
                  selectedValues.delete(value)
                }
                else {
                  selectedValues.add(value)
                }
                const filterValues = Array.from(selectedValues)
                column?.setFilterValue(
                  filterValues.length ? filterValues : undefined,
                )
              }"
            >
              <div
                  :class="cn(
                  'mr-2 flex items-center justify-center rounded-sm border border-primary',
                  selectedValues.has(option.name)
                    ? 'bg-primary text-primary-foreground'
                    : 'opacity-50 [&_svg]:invisible',
                )"
              >
                <CheckIcon :class="cn('h-4 w-4 text-white')"/>
              </div>
              <span>{{ option.name }}</span>
              <span v-if="facets?.get(option.name)"
                    class="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                {{ facets.get(option.name) }}
              </span>
            </CommandItem>
          </CommandGroup>

          <template v-if="selectedValues.size > 0">
            <CommandSeparator/>
            <CommandGroup>
              <CommandItem
                  class="justify-center text-center"
                  value="Clear filters"
                  @select="() => { column?.setFilterValue(undefined); open = false }"
              >
                Clear filters
              </CommandItem>
            </CommandGroup>
          </template>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>