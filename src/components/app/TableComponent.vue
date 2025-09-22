<script lang="ts" setup>
import {ref, watchEffect} from 'vue'
import {
  ColumnDef,
  ColumnFiltersState,
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useVueTable
} from '@tanstack/vue-table'
import {Input} from '@/components/ui/input'
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow,} from '@/components/ui/table'

type AnyRow = Record<string, any>

const props = defineProps<{
  data: AnyRow[]
  columns: ColumnDef<AnyRow, any>[]
  totalLabel?: string
  placeholder?: string
}>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const globalFilter = ref<string>('')
const rowSelection = ref<Record<string, boolean>>({})

const table = useVueTable<AnyRow>({
  data: props.data ?? [],
  columns: props.columns ?? [],
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
    get globalFilter() {
      return globalFilter.value
    },
    get rowSelection() {
      return rowSelection.value
    },
  },
  onSortingChange: updater => {
    sorting.value = typeof updater === "function" ? updater(sorting.value) : updater
  },
  onColumnFiltersChange: updater => {
    columnFilters.value = typeof updater === "function" ? updater(columnFilters.value) : updater
  },
  onGlobalFilterChange: updater => {
    globalFilter.value = typeof updater === "function" ? updater(globalFilter.value) : updater
  },
  onRowSelectionChange: updater => {
    rowSelection.value = typeof updater === "function" ? updater(rowSelection.value) : updater
  },
})

// keep table in sync when props change
watchEffect(() => {
  table.setOptions((prev) => ({
    ...prev,
    data: props.data ?? [],
    columns: props.columns ?? [],
  }))
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between gap-4 mb-4">
      <Input
          v-model="globalFilter"
          :placeholder="placeholder || 'Search...'"
          class="border rounded px-3 py-2 text-sm w-full max-w-sm"
          type="text"
      />
      <div class="flex items-center gap-2">
        <button
            :disabled="!table.getCanPreviousPage()"
            class="border rounded px-3 py-1 text-sm"
            @click="table.previousPage()"
        >
          Prev
        </button>
        <span class="text-sm">
          Page {{ table.getState().pagination.pageIndex + 1 }} of {{ table.getPageCount() }}
        </span>
        <button
            :disabled="!table.getCanNextPage()"
            class="border rounded px-3 py-1 text-sm"
            @click="table.nextPage()"
        >
          Next
        </button>
      </div>
    </div>

    <Table class="w-full">
      <TableHeader>
        <template v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableRow>
            <template v-for="header in headerGroup.headers" :key="header.id">
              <TableHead
                  class="cursor-pointer select-none"
                  @click="header.column.getToggleSortingHandler()?.($event)"
              >
                <FlexRender
                    v-if="!header.isPlaceholder"
                    :props="header.getContext()"
                    :render="header.column.columnDef.header"
                />
              </TableHead>
            </template>
          </TableRow>
        </template>
      </TableHeader>

      <TableBody>
        <template v-if="table.getRowModel().rows.length">
          <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :props="cell.getContext()" :render="cell.column.columnDef.cell"/>
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="text-center text-sm py-6">
              No results.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell :colspan="columns.length" class="text-right text-sm">
            {{ totalLabel || 'Total items' }}: {{ data.length }}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </div>
</template>